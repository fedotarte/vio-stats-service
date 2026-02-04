import { ApiProperty } from '@nestjs/swagger';
import { AssignedRecruiterDto } from './assigned-recruiter.dto';
import { RecruiterVacancyEntity } from '../entities/recruiter-vacancy.entity';
import { AssignedVacancyDto } from './assigned-vacancy.dto';

export class AssignedVacancyRecruiterDto extends RecruiterVacancyEntity {
  @ApiProperty({ type: () => AssignedRecruiterDto })
  recruiter: AssignedRecruiterDto;

  @ApiProperty({ type: () => AssignedVacancyDto })
  vacancy: AssignedVacancyDto;
}
