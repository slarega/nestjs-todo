import {OmitType, PartialType} from '@nestjs/swagger'
import { CreateProjectTaskDto } from './create-project-task.dto'

class WithoutColIdProjectTaskDto extends OmitType(CreateProjectTaskDto, ['columnId'] as const) {}
export class UpdateProjectTaskDto extends PartialType(WithoutColIdProjectTaskDto) {}
