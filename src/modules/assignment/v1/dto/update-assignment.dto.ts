import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, Min, IsOptional } from 'class-validator';
import { normalizeOptionalNumber } from '../../../dto-transforms';

export class UpdateAssignmentDto {
  @ApiProperty({
    description: 'Количество необходимых резюме',
    example: 10,
    required: false,
  })
  @Transform(normalizeOptionalNumber)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  requiredResumes?: number;

  @ApiProperty({
    description: 'Количество отправленных резюме',
    example: 5,
    required: false,
  })
  @Transform(normalizeOptionalNumber)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  sentResumes?: number;

  @ApiProperty({
    description: 'Количество принятых резюме',
    example: 3,
    required: false,
  })
  @Transform(normalizeOptionalNumber)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  acceptedResumes?: number;

  @ApiProperty({
    description: 'Количество отклоненных резюме',
    example: 2,
    required: false,
  })
  @Transform(normalizeOptionalNumber)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  rejectedResumes?: number;
}
