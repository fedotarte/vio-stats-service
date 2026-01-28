import { Module } from '@nestjs/common';
import { RecruiterController } from './recruiter.controller';
import { RecruiterService } from './recruiter.service';
import { RecruiterRepository } from './repository/recruiter.repository';

@Module({
  controllers: [RecruiterController],
  providers: [RecruiterService, RecruiterRepository],
  exports: [RecruiterService],
})
export class RecruiterModule {}
