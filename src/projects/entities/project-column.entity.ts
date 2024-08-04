import {ApiProperty} from "@nestjs/swagger"

export class ProjectColumn {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string
}
