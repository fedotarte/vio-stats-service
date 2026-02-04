import { ApiProperty } from '@nestjs/swagger';
import { AssignedRecruiterDto } from './assigned-recruiter.dto';
import { AssignmentEntity } from '../entities/assignment.entity';
import { AssignedVacancyDto } from './assigned-vacancy.dto';

export class AssignedVacancyRecruiterDto extends AssignmentEntity {
  @ApiProperty({ type: () => AssignedRecruiterDto })
  recruiter: AssignedRecruiterDto;

  @ApiProperty({ type: () => AssignedVacancyDto })
  vacancy: AssignedVacancyDto;
}
