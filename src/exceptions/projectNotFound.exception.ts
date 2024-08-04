import { NotFoundException } from '@nestjs/common';

export class ProjectNotFoundException extends NotFoundException {
  constructor(ProjectId: number) {
    super(`Проекта с id ${ProjectId} не найдено`);
  }
}