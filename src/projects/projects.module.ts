import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { ProjectTasksController } from "./project-tasks.controller";
import { ProjectTasksService } from "./project-tasks.service";
import { ProjectColumnsController } from "./project-columns.controller";
import { ProjectColumnsService } from "./project-columns.service";

@Module({
  controllers: [
      ProjectsController,
      ProjectColumnsController,
      ProjectTasksController
  ],
  providers: [
      ProjectsService,
      ProjectColumnsService,
      ProjectTasksService
  ],
  imports: [
      PrismaModule,
      AuthModule
  ]
})
export class ProjectsModule {}
