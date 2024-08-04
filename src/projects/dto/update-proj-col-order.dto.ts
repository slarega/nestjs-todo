import {ApiProperty} from "@nestjs/swagger";

export class UpdateProjColOrderDto {
    @ApiProperty({example: [3, 2, 1], description: 'Новый порядок столбцов проекта'})
    newColOrder: number[]
}