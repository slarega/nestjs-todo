import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { RoleEntity } from "./entities/role.entity"

@Controller('roles')
@ApiTags('Others / Остальные')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание роли / Role creation' })
  @ApiCreatedResponse({ type: RoleEntity })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Get()
  @ApiOperation({ summary: 'Получить все роли / Get all roles' })
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async findAll() {
    return this.rolesService.findAll()
  }

  @Get(':value')
  @ApiOperation({ summary: 'Получить роль по value / Get role by value' })
  @ApiOkResponse({ type: RoleEntity })
  async findByValue(@Param('value') value: string) {
    return this.rolesService.findByValue( value )
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные роли по id / Update role data by id' })
  @ApiOkResponse({ type: RoleEntity })
  async updateById(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateById(+id, updateRoleDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить роль по id / Delete role by id' })
  @ApiOkResponse({ type: RoleEntity })
  async removeById(@Param('id') id: string) {
    return this.rolesService.removeById(+id)
  }
}
