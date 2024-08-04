import { Controller, Post, Body, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserEntity } from "../users/entities/user.entity";
import { Response } from 'express';


@Controller('auth')
@ApiTags('Авторизация / Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @ApiOperation({ summary: 'Регистрация пользователя / User registration' })
  @ApiOkResponse({ type: UserEntity })
  registration(@Body() userDto: CreateUserDto) {
      return this.authService.registration(userDto)
  }

  @Post('/login')
  @ApiOperation({ summary: 'Вход в систему / Login' })
  async login( @Body() userDto: CreateUserDto,
               @Res({ passthrough: true }) response: Response ) {
      const token: string = await this.authService.login(userDto)
      response.setHeader('x-bearer-token', token)

      return token
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Выход из системы / Logout' })
  logout( @Res({ passthrough: true }) response: Response ) {
      const token = this.authService.logout()
      response.setHeader('x-bearer-token', token)
      return token
  }
}
