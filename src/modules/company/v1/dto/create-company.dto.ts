import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { normalizeOptionalString } from '../../../dto-transforms';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Название компании',
    example: 'ООО Рога и Копыта',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email компании',
    example: 'info@company.com',
    required: false,
  })
  @Transform(normalizeOptionalString)
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Телефон компании',
    example: '+7 999 999 99 99',
    required: false,
  })
  @Transform(normalizeOptionalString)
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Адрес компании',
    example: 'г. Москва, ул. Ленина, д. 1',
    required: false,
  })
  @Transform(normalizeOptionalString)
  @IsOptional()
  @IsString()
  address?: string;
}
