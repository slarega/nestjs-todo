import {NestFactory} from "@nestjs/core";
import {SeederModule} from "./seeder.module";
import {Seeder} from "./seeder";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function seedInfo(promise: Promise<any>, name: string) {
    await promise
        .then( (val) => {
            console.log(`Успешно засеяны ${name}:`)
            console.log(val)
        }).catch( (err) => {
            console.log(`Ошибка засеивания ${name} `)
            throw err
        })
}

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async appContext => {
      const seeder = appContext.get(Seeder)

        await seedInfo(seeder.users(), 'users')
            .then(async () => {
                await seedInfo(seeder.admin(), 'admin')
            })
            .then(async () => {
                await seedInfo(seeder.roles(), 'roles')
            })
            .finally(() => appContext.close())
    })

    .catch(err => { throw err })
}
bootstrap()
    .then(async () => {
        await prisma.$disconnect()
    })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })