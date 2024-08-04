import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers['x-bearer-token'].split(' ')

            if (authHeader[0] !== 'Bearer' || !authHeader[1]) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const user = this.jwtService.verify(authHeader[1]);
            req.user = user;
            return true;
        } catch (err) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }
}