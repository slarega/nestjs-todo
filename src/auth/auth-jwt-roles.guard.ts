import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";
import {UsersService} from "../users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector,
                private usersService: UsersService,) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) { return true }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers['x-bearer-token'].split(' ')

            if (authHeader[0] !== 'Bearer' || !authHeader[1]) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const userEmail = this.jwtService.verify(authHeader[1]).email
            const user = await this.usersService.findByEmail(userEmail).then()
            return user.roles.some(role => requiredRoles.includes(role.role.value))

        } catch (e) {
            console.log(context.switchToHttp().getRequest().headers)
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
        }
    }

}