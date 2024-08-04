import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      PrismaModule,
      forwardRef(() => AuthModule),
  ],
  exports: [
      UsersService,
  ]
})
export class UsersModule {}
