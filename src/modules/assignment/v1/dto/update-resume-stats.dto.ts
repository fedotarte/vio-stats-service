import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, Min, IsOptional } from 'class-validator';
import { normalizeOptionalNumber } from '../../../dto-transforms';

export enum ResumeAction {
  SENT = 'sent',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export class UpdateResumeStatsDto {
  @ApiProperty({
    description: 'Тип действия с резюме',
    enum: ResumeAction,
    example: ResumeAction.SENT,
  })
  @IsEnum(ResumeAction)
  action: ResumeAction;

  @ApiProperty({
    description: 'Количество резюме для добавления',
    example: 1,
    default: 1,
  })
  @Transform(normalizeOptionalNumber)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  count?: number;
}
