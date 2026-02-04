import { ApiProperty } from '@nestjs/swagger';
import { CompanyAssignedVacancyDto } from './company-assigned-vacancy.dto';

export class AssignedVacancyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  deadline: Date;

  @ApiProperty({ type: () => CompanyAssignedVacancyDto })
  company: CompanyAssignedVacancyDto;
}
