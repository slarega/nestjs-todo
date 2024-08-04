import {Controller, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ProjectTasksService } from './project-tasks.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import {ApiOkResponse, ApiOperation, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {UpdateTaskColumnDto} from "./dto/update-task-column.dto";
import {UpdateTaskColumn} from "./entities/update-task-column.entity";
import {JwtAuthGuard} from "../auth/auth-jwt.guard";
import {ProjectTask} from "./entities/project-task.entity";

@Controller('project')
@ApiTags('Проекты 3 - задачи')
@ApiSecurity('x-bearer-token')
@UseGuards(JwtAuthGuard)
export class ProjectTasksController {
  constructor(private readonly projectTasksService: ProjectTasksService) {}

  @Post(':id/task')
  @ApiOperation({ summary: 'Создать задачу проекта по id / Create a project task by id' })
  @ApiOkResponse({ type: ProjectTask })
  create(@Param('id') id: string,
         @Body() createProjectTaskDto: CreateProjectTaskDto) {
    return this.projectTasksService.create(+id, createProjectTaskDto)
  }

  @Patch(':id/tasks/:tid')
  @ApiOperation({ summary: 'Обновить задачу tid - проекта id / Update task tid - project id' })
  @ApiOkResponse({ type: ProjectTask })
  update(@Param('id') id: string,
         @Param('tid') tid: string,
         @Body() updateProjectTaskDto: UpdateProjectTaskDto) {
    return this.projectTasksService.update(+id, +tid, updateProjectTaskDto);
  }

  @Patch(':id/column/:cid')
  @ApiOperation({ summary: 'Изменить столбец задачи / Change task column' })
  @ApiOkResponse({ type: UpdateTaskColumn})
  changeTaskColumn(@Param('id') id: string,
                   @Param('cid') cid: string,
                   @Body() updateTaskColumn: UpdateTaskColumnDto) {
    return this.projectTasksService.changeTaskColumn(+id, +cid, updateTaskColumn)
  }

  @Delete('/task/:tid')
  @ApiOperation({ summary: 'Удалить задачу по tid / Delete task by tid' })
  remove(@Param('tid') tid: string) {
    return this.projectTasksService.remove(+tid)
  }
}
