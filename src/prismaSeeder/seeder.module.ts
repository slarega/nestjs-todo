import { Module } from "@nestjs/common";
import { Seeder } from "./seeder";
import {AuthModule} from "../auth/auth.module";
import {RolesModule} from "../roles/roles.module";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    providers: [ Seeder ],
    imports: [
        PrismaModule,
        AuthModule,
        RolesModule
    ]
})
export class SeederModule {}