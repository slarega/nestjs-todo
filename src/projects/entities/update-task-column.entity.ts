import { ApiProperty } from "@nestjs/swagger"

export class UpdateTaskColumn {
    @ApiProperty()
    relId: number
}
