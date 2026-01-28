import { ApiProperty } from '@nestjs/swagger';

export class VacancyEntity {
  @ApiProperty({ description: 'Уникальный идентификатор вакансии' })
  id: string;

  @ApiProperty({ description: 'Название вакансии' })
  title: string;

  @ApiProperty({ description: 'Описание вакансии', required: false })
  description?: string;

  @ApiProperty({ description: 'Дедлайн по вакансии', required: false })
  deadline?: Date;

  @ApiProperty({ description: 'ID компании-клиента' })
  companyId: string;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления' })
  updatedAt: Date;
}
