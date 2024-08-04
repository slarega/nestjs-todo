import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import * as process from "process";
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
            PrismaModule,
            ConfigModule.forRoot(
                {envFilePath: `.${process.env.NODE_ENV}.env`}
            ),
            LoggerModule.forRoot({
              pinoHttp: {
                  customProps: (req, res) => ({ context: 'HTTP' }),
                  transport: {
                    target: 'pino-pretty',
                    options: { singleLine: true, translateTime: "HH:MM:ss" }
                  },
                  redact: { paths:["pid", "*.headers", "*.remoteAddress"], remove: true},
              },
            }),
            UsersModule,
            RolesModule,
            AuthModule,
            ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
