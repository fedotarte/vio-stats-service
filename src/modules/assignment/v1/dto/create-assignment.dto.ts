import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';
import { normalizeOptionalNumber } from '../../../dto-transforms';

export class CreateAssignmentDto {
  @ApiProperty({
    description: 'ID рекрутера',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  recruiterId: string;

  @ApiProperty({
    description: 'ID вакансии',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  vacancyId: string;

  @ApiProperty({
    description: 'Количество необходимых резюме',
    example: 10,
    default: 0,
  })
  @Transform(normalizeOptionalNumber)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  requiredResumes?: number;
}
