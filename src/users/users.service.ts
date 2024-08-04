import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ChangeRoleDto } from "./dto/change-role.dto"
import { PrismaService } from "../prisma/prisma.service"
import { User } from "@prisma/client"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {

    return this.prisma.user.create({
      data: {
        email: CreateUserDto.email,
        password: CreateUserDto.password,
        roles: {
          create: {
            role: {
              connectOrCreate: {
                where: { value: "USER" },
                create: {
                  value: "USER",
                  description: "Пользователь",
                }}}}
        }
      },
      include:{
        roles: {
          select: {
            role: {
              select: { value: true }
            }}}
      }
    })
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        roles: {
          select: {
            role: {
              select: { value: true }
            }}}
      }
    })
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          select: {
            role: {
              select: { value: true }
            }}},
        projects: {
          select: {
            id: true,
            name: true,
            createDate: true
          }
        }
      }
    })
  }

  async updateById(id: number, UpdateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {id},
      data: UpdateUserDto
    });
  }

  async addRoleById (id: number, ChangeRoleDto: ChangeRoleDto) {
    await this.prisma.user.update({
      where: { id },
      data: {
        roles: {
          create: ChangeRoleDto.rolesId.map((roleId) => ({roleId: roleId}))
        }
      },
      include: { roles: true },
    })
    return this.findById(id)
  }

  async deleteRoleById(id: number, ChangeRoleDto: ChangeRoleDto) {
    await this.prisma.rolesOnUsers.deleteMany({
      where: {
        userId: id,
        roleId: { in: ChangeRoleDto.rolesId.map((roleId) => roleId)}
      }
    })
    return this.findById(id)
  }

  async deleteById(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }

  async findByEmail (email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
      include: {
        roles: {
          select: {
            role: {
              select: { value: true }
            }}}
      }
    })
  }
}