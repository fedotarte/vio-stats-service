import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateRecruiterDto {
  @ApiProperty({ description: 'Имя рекрутера', example: 'Иван' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Фамилия рекрутера', example: 'Иванов' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email рекрутера', example: 'ivan@company.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Телефон рекрутера',
    example: '+7 999 123 45 67',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
