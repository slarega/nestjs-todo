import { Role } from "@prisma/client"
import { ApiProperty } from '@nestjs/swagger'

export class RoleEntity implements Role{
    @ApiProperty()
    id: number

    @ApiProperty()
    value: string

    @ApiProperty()
    description: string
}
