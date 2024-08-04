import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { PrismaService } from "../prisma/prisma.service"
import { Role } from "@prisma/client"

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({ data: createRoleDto })
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany()
  }

  async findByValue(value: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { value }})
  }

  async updateById(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    })
  }

  async removeById(id: number): Promise<Role> {
    return this.prisma.role.delete({where: { id }})
  }
}
