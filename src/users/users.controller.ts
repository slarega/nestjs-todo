import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiHeaders,
  ApiOkResponse,
  ApiOperation, ApiSecurity,
  ApiTags
} from '@nestjs/swagger'
import { UserEntity } from './entities/user.entity'
import { ChangeRoleDto } from "./dto/change-role.dto"
import { Roles } from "../auth/roles-auth.decorator"
import { RolesGuard } from "../auth/auth-jwt-roles.guard"

@Controller('users')
@ApiTags('Others / Остальные')
@ApiSecurity('x-bearer-token')
// @Roles("USER")
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей / Get all users' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiHeaders([{
    name: 'x-bearer-token',
    description: 'Bearer your-token'}
  ])
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по id / Get user by id' })
  @ApiOkResponse({ type: UserEntity })
  async findById(@Param('id') id: string) {
    return this.usersService.findById(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные пользователя по id / Update user data by id' })
  @ApiOkResponse({ type: UserEntity })
  async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateById(+id, updateUserDto)
  }

  @Patch('roleAdd/:id')
  @ApiOperation({ summary: 'Добавить роли пользователю по id / Add user roles by id' })
  @ApiOkResponse({ type: UserEntity })
  async addRoleById(@Param('id') id: string, @Body() ChangeRoleDto: ChangeRoleDto) {
    return this.usersService.addRoleById(+id, ChangeRoleDto)
  }

  @Patch('roleDel/:id')
  @ApiOperation({ summary: 'Удалить роли пользователю по id / Delete user roles by id' })
  @ApiOkResponse({ type: UserEntity })
  async deleteRoleById(@Param('id') id: string, @Body() ChangeRoleDto: ChangeRoleDto) {
    return this.usersService.deleteRoleById(+id, ChangeRoleDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по id / Delete user by id' })
  @ApiOkResponse({ type: UserEntity })
  async deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(+id)
  }

}
