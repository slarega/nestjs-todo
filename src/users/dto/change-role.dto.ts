import { ApiProperty } from "@nestjs/swagger"
import { IsArray } from "class-validator"

export class ChangeRoleDto {
    @ApiProperty({example: '[2]', description: '[id ролей]'})
    @IsArray({message: "Должно быть массивом id ролей"})
    readonly rolesId: number[]
}