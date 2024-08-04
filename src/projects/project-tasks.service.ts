import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import {PrismaService} from "../prisma/prisma.service";
import {UpdateTaskColumnDto} from "./dto/update-task-column.dto";

@Injectable()
export class ProjectTasksService {
  constructor(private prisma: PrismaService) {}

  async create(id: number,
               createProjectTaskDto: CreateProjectTaskDto) {
    const projCol = this.prisma.project.findUnique({
      where: { id }
    })
    try {
      return await projCol
        .then((res)=> {
          if (res.columnOrder.includes(createProjectTaskDto.columnId)) {
            return this.prisma.projectTask.create({
              data: {
                name: createProjectTaskDto.name,
                description: createProjectTaskDto.description,
                deadline: createProjectTaskDto.deadline,
                project: { create: {
                    projectId: id,
                    columnId: createProjectTaskDto.columnId
                } }
              }
            })
          } else {
            throw new HttpException(
                `Столбец с id ${createProjectTaskDto.columnId} не в проекте или не существует`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
          }
        })
    } catch (err) { throw err }
  }

  async update(id: number,
               tid: number,
               updateProjectTaskDto: UpdateProjectTaskDto) {
    return this.prisma.projectTask.update({
      where: { id: tid },
      data: updateProjectTaskDto
    })
  }

  async changeTaskColumn(id: number,
                         cid: number,
                         updateTaskColumn: UpdateTaskColumnDto){
    return this.prisma.projectData.update({
      where: { relId_projectId: {
                relId: updateTaskColumn.relId,
                projectId: id
      } },
      data: { columnId: cid }
    })
  }

  async remove(tid: number) {
    return this.prisma.projectTask.delete({
      where: {id: tid},
      include: { project: true }
    })
  }
}
