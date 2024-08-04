import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ProjectColumnsService } from './project-columns.service'
import { CreateProjectColumnDto } from './dto/create-project-column.dto'
import { ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "../auth/auth-jwt.guard"
import { UpdateProjColOrderDto } from "./dto/update-proj-col-order.dto"

@Controller('project')
@ApiTags('Проекты 2 - столбцы')
@ApiSecurity('x-bearer-token')
@UseGuards(JwtAuthGuard)
export class ProjectColumnsController {
  constructor(private readonly projectColumnsService: ProjectColumnsService) {}

  @Post(':id/column')
  @ApiOperation({ summary: 'Добавить-создать столбец в проект по id / Add-create column in project by id' })
  create(@Param('id') id: string,
         @Body() createProjectColumnDto: CreateProjectColumnDto) {
    return this.projectColumnsService.create(+id, createProjectColumnDto)
  }

  @Get('all-columns')
  @ApiOperation({ summary: 'Получить все существующие столбцы / Get all existing columns' })
  findAll() {
    return this.projectColumnsService.findAll()
  }

  @Patch(':id/columnOrder')
  @ApiOperation({ summary: 'Изменить порядок столбцов в проекте по id / Change order of columns in project by id' })
  changeOrder(@Param('id') id: string,
              @Body() updateProjColOrderDto: UpdateProjColOrderDto){
    return this.projectColumnsService.changeOrder(+id, updateProjColOrderDto)
  }
  @Delete(':id/column/:cid')
  @ApiOperation({ summary: 'Удалить столбец из проекта по id / Delete a column from a project by id' })
  remove(@Param('id') id: string,
         @Param('cid') cid: string) {
    return this.projectColumnsService.remove(+id, +cid)
  }
}
