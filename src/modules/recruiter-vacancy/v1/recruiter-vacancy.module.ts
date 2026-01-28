import { Module } from '@nestjs/common';
import { RecruiterVacancyController } from './recruiter-vacancy.controller';
import { RecruiterVacancyService } from './recruiter-vacancy.service';
import { RecruiterVacancyRepository } from './repository/recruiter-vacancy.repository';

@Module({
  controllers: [RecruiterVacancyController],
  providers: [RecruiterVacancyService, RecruiterVacancyRepository],
  exports: [RecruiterVacancyService],
})
export class RecruiterVacancyModule {}
