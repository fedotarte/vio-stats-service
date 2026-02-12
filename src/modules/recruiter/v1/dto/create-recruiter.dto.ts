import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { normalizeOptionalString } from '../../../dto-transforms';

export class CreateRecruiterDto {
  @ApiProperty({ description: 'Имя рекрутера', example: 'Иван' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Фамилия рекрутера', example: 'Иванов' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email рекрутера', example: 'ivan@company.com' })
  @Transform(normalizeOptionalString)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Телефон рекрутера',
    example: '+7 999 123 45 67',
    required: false,
  })
  @Transform(normalizeOptionalString)
  @IsOptional()
  @IsString()
  phone?: string;
}
