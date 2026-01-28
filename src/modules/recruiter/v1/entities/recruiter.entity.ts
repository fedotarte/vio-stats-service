import { ApiProperty } from '@nestjs/swagger';

export class RecruiterEntity {
  @ApiProperty({ description: 'Уникальный идентификатор рекрутера' })
  id: string;

  @ApiProperty({ description: 'Имя рекрутера' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия рекрутера' })
  lastName: string;

  @ApiProperty({ description: 'Email рекрутера' })
  email: string;

  @ApiProperty({ description: 'Телефон рекрутера', required: false })
  phone?: string;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления' })
  updatedAt: Date;
}
