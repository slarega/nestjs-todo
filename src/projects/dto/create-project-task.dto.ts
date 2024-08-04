import { ApiProperty } from "@nestjs/swagger"
import {IsDate, IsNumber, IsString, Length} from "class-validator"
import { Type } from "class-transformer"

export class CreateProjectTaskDto {
    @ApiProperty({example: 1, description: 'id столбца'})
    @IsNumber()
    readonly columnId: number

    @ApiProperty({example: 'Задача1', description: 'Название задачи'})
    @IsString({message: 'Должно быть строкой'})
    @Length(5, 10, {message: 'Не меньше 3 и не больше 12'})
    readonly name: string

    @ApiProperty({example: 'Тест', description: 'Описание'})
    @IsString({message: 'Должно быть строкой'})
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 50, {message: 'Не меньше 3 и не больше 12'})
    readonly description: string

    @ApiProperty({example: '2024-08-20T15:10:00Z', description: 'Дедлайн задачи'})
    @Type(() => Date)
    @IsDate()
    deadline: Date | string
}
