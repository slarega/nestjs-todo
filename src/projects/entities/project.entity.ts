import {ApiProperty} from "@nestjs/swagger"

export class ProjectEntity {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    createDate: Date
}
