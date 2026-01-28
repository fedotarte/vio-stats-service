import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateVacancyDto } from './create-vacancy.dto';

export class UpdateVacancyDto extends PartialType(
  OmitType(CreateVacancyDto, ['companyId'] as const),
) {}
