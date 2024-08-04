import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import RequestWithUser from "../auth/requestWithUser.interface";
import {ApiOkResponse, ApiOperation, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/auth-jwt.guard";
import {ProjectEntity} from "./entities/project.entity";
import {ProjectFullDataEntityEntity} from "./entities/project-full-data.entity";

@Controller('projects')
@ApiTags('Проекты 1 / Projects 1')
@ApiSecurity('x-bearer-token')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать проект / Create a project' })
  @ApiOkResponse({type: ProjectEntity})
  async create(@Body() createProjectDto: CreateProjectDto,
               @Req() req: RequestWithUser) {
    return this.projectsService.create(createProjectDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все проекты пользователя / Get all user projects' })
  @ApiOkResponse({type: ProjectEntity, isArray: true})
  async findAllProjectsByUser(@Req() req: RequestWithUser) {
    return this.projectsService.findAllProjectsByUser(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить проект пользователя по id / Get user project by id' })
  @ApiOkResponse({type: ProjectFullDataEntityEntity})
  findOne(@Param('id') id: string,
          @Req() req: RequestWithUser) {
    return this.projectsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные проекта / Update project data by id' })
  @ApiOkResponse({type: ProjectEntity})
  async updateProjectById(@Param('id') id: string,
         @Body() updateProjectDto: UpdateProjectDto,
         @Req() req: RequestWithUser) {
    return this.projectsService.updateProjectById(+id, updateProjectDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект по id / Delete project by id' })
  @ApiOkResponse({type: ProjectEntity})
  async removeProjectById(@Param('id') id: string,
               @Req() req: RequestWithUser) {
    return  this.projectsService.removeProjectById(+id, req.user);
  }
}
