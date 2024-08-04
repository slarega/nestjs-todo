import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async registration(userDto: CreateUserDto) {
    const hashedPassword  = await bcrypt.hash(userDto.password, 5)
    try {
      const user = await this.usersService.create({
        ...userDto,
        password: hashedPassword
      })
      return {...user, password: undefined}
    } catch (err) {
        if (await this.usersService.findByEmail(userDto.email)) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
    }
    throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  async login(userDto: CreateUserDto): Promise<string> {
    const user = await this.getAuthUser(userDto)
    const payload = {email: user.email, id: user.id}
    const token = this.jwtService.sign(payload)
  return `Bearer ${token}`
  }

  logout() {
    return `Bearer  `
  }

  async getAuthUser(userDto: CreateUserDto) {
    try {
      const user = await this.usersService.findByEmail(userDto.email)
      await this.validateUser(userDto.password, user.password)
      return user
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new BadRequestException();
      }
      throw err;
    }
  }

  private async validateUser(
      plainTextPassword: string,
      hashedPassword: string,) {
    const passwordEquals = await bcrypt.compare(plainTextPassword, hashedPassword)
    if (!passwordEquals) {
      throw new UnauthorizedException({message: 'Некорректный пароль'})
    }
  }
}
