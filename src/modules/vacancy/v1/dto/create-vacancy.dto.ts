import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { normalizeOptionalString } from '../../../dto-transforms';

export class CreateVacancyDto {
  @ApiProperty({
    description: 'Название вакансии',
    example: 'Senior Backend Developer',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Описание вакансии',
    example: 'Разработка backend сервисов на Node.js',
    required: false,
  })
  @Transform(normalizeOptionalString)
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Дедлайн по вакансии',
    example: '2026-03-01T00:00:00.000Z',
    required: false,
  })
  @Transform(normalizeOptionalString)
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({
    description: 'ID компании-клиента',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  companyId: string;
}
