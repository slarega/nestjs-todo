import {Injectable} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";
import {RolesService} from "../roles/roles.service";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class Seeder{
    constructor(private readonly prisma: PrismaService,
                private readonly authService: AuthService,
                private readonly rolesService: RolesService) {
    }

    async seed() {
        await this.seedInfo(this.users(), "users")
            // .then(await this.seedInfo(this.admin(), "admin"))
            // .then(await this.seedInfo(this.roles(), "roles"))
    }

    async seedInfo(promise: Promise<any>, name: string): Promise<any> {
        promise
            .then( (val) => {
                console.log(`Успешно засеяны ${name}:`)
                console.log(val)
            }).catch( (err) => {
              console.log(`Ошибка засеивания ${name} \n ${err}`)
            })
    }

    async users() {
        return await Promise.all([
            this.authService.registration({
                email: "example@mail.ru",
                password: "123456"
            }),
            this.authService.registration({
                email: "example@gmail.ru",
                password: "425962"
            }),
            this.authService.registration({
                email: "example@yandex.ru",
                password: "879832"
            })
        ])
    }

    async roles() {
        return await Promise.all([
            this.rolesService.create({
                value: "TEST1",
                description: "Тест1"
            }),
            this.rolesService.create({
                value: "TEST2",
                description: "Тест2"
            })
        ])
    }

    async admin() {
        return this.prisma.user.upsert({
            where: { email: "admin@mail.ru" },
            update: {},
            create: {
              email: "admin@mail.ru",
              password: "h12oi253n",
                roles: {
                  create: {
                    role: {
                      connectOrCreate: {
                        where: { value: "ADMIN" },
                        create: {
                          value: "ADMIN",
                          description: "Администратор",
                        }}}}}
            }
        })
    }
}