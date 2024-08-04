import { ApiProperty } from "@nestjs/swagger"

export class ProjectTask {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    createDate: Date

    @ApiProperty()
    deadline: Date
}
