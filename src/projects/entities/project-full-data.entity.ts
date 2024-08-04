import { ApiProperty } from "@nestjs/swagger"
import { ProjectEntity } from "./project.entity"
import { ProjectColumn } from "./project-column.entity"
import { ProjectTask } from "./project-task.entity"

class relData {
    @ApiProperty()
    relId: number

    @ApiProperty({ type: ProjectColumn })
    column

    @ApiProperty({ type: ProjectTask })
    task
}

export class ProjectFullDataEntityEntity extends ProjectEntity {
    @ApiProperty({ type: [relData] })
    data
}
