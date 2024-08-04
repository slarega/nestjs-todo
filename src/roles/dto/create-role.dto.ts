import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateRoleDto {
    @ApiProperty({example: 'TEST', description: 'Название'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string

    @ApiProperty({example: 'Тест', description: 'Описание'})
    @IsString({message: 'Должно быть строкой'})
    readonly description: string
}
