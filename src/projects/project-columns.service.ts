import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProjectColumnDto } from './dto/create-project-column.dto'
import { PrismaService } from "../prisma/prisma.service"
import { UpdateProjColOrderDto } from "./dto/update-proj-col-order.dto"

@Injectable()
export class ProjectColumnsService {
  constructor(private prisma: PrismaService) {}

  async create(id: number, createProjectColumnDto: CreateProjectColumnDto) {
    return this.prisma.projectColumn.upsert({
      where: {name: createProjectColumnDto.name},
      update: {},
      create: {name: createProjectColumnDto.name}
    })
      .then(async res => {
        const hm =  await this.prisma.projectData.findFirst({
          where: {projectId: id, columnId: res.id}
        })
        if (hm === null) {
          await this.prisma.project.update({
            where: {id},
            data:{
              projectData: {
                create: {
                  column: {
                    connectOrCreate: {
                      where: { name: res.name },
                      create: { name: res.name }
                    }
                  }
                }
              },
              columnOrder: {
                push: res.id
              }
            }
          })
        }
        return this.prisma.projectData.findFirst({
          where: { projectId: id, columnId: res.id }
        })
      })
  }

  async findAll() {
    return this.prisma.projectColumn.findMany()
  }

  async changeOrder(id: number,
                    updateProjColOrderDto: UpdateProjColOrderDto) {
      const curOrder = this.prisma.project.findUnique({
        where: { id }
      })
      try {
        return  await curOrder
          .then((res) => {
              const check = () => {
                    const set1 = new Set(res.columnOrder);
                    const set2 = new Set(updateProjColOrderDto.newColOrder);
                    if (set1.size !== set2.size) { return false }
                    for (const item of set1) {
                        if (!set2.has(item)) { return false }
                    }
                    return true
              }
              if (check()) {
                  return this.prisma.project.update({
                    where: { id },
                    data: {
                      columnOrder: { set: updateProjColOrderDto.newColOrder }
                    }
                  })
              } else {
                  throw new HttpException(
                    `Новый порядок столбцов [${updateProjColOrderDto.newColOrder}] не соответствует старому [${res.columnOrder}]`,
                    HttpStatus.INTERNAL_SERVER_ERROR
                  )
              }
          })
      } catch (err) { throw err }
  }

  async remove(id: number,
               cid: number) {
    return this.prisma.project.findUnique({
      where: { id }
    })
        .then(async (res) => {
          let newOrder = res.columnOrder.filter((col) => col != cid)
          await this.prisma.project.update({
            where: { id },
            data: {
              columnOrder: { set: newOrder }
            }
          })
          return this.prisma.projectData.deleteMany({
              where: { projectId: id, columnId: cid } })
        })
  }
}
