import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsOptional } from 'class-validator';

export class UpdateRecruiterVacancyDto {
  @ApiProperty({
    description: 'Количество необходимых резюме',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  requiredResumes?: number;

  @ApiProperty({
    description: 'Количество отправленных резюме',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sentResumes?: number;

  @ApiProperty({
    description: 'Количество принятых резюме',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  acceptedResumes?: number;

  @ApiProperty({
    description: 'Количество отклоненных резюме',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  rejectedResumes?: number;
}
