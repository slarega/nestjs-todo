import {ApiProperty} from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class CreateProjectColumnDto {
    @ApiProperty({example: 'to do', description: 'Название cтолбца'})
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 12, {message: 'Не меньше 3 и не больше 12'})
    readonly name: string
}
