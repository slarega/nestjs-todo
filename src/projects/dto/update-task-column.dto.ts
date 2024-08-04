import { ApiProperty } from "@nestjs/swagger"
import {IsNumber} from "class-validator"

export class UpdateTaskColumnDto {
    @ApiProperty({example: 1, description: 'id связи'})
    @IsNumber()
    readonly relId: number
}