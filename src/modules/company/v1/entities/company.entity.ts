import { ApiProperty } from '@nestjs/swagger';

export class CompanyEntity {
  @ApiProperty({ description: 'Уникальный идентификатор компании' })
  id: string;

  @ApiProperty({ description: 'Название компании' })
  name: string;

  @ApiProperty({ description: 'Email компании', required: false })
  email?: string;

  @ApiProperty({ description: 'Телефон компании', required: false })
  phone?: string;

  @ApiProperty({ description: 'Адрес компании', required: false })
  address?: string;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления' })
  updatedAt: Date;
}
