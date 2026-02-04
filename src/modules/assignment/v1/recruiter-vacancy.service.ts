import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { RecruiterVacancyRepository } from './repository/recruiter-vacancy.repository';
import { CreateRecruiterVacancyDto } from './dto/create-recruiter-vacancy.dto';
import { UpdateRecruiterVacancyDto } from './dto/update-recruiter-vacancy.dto';
import {
  UpdateResumeStatsDto,
  ResumeAction,
} from './dto/update-resume-stats.dto';

@Injectable()
export class RecruiterVacancyService {
  constructor(
    private readonly recruiterVacancyRepository: RecruiterVacancyRepository,
  ) {}

  async create(dto: CreateRecruiterVacancyDto) {
    // Проверяем, не существует ли уже такая связка
    const existing =
      await this.recruiterVacancyRepository.findByRecruiterAndVacancy(
        dto.recruiterId,
        dto.vacancyId,
      );
    if (existing) {
      throw new ConflictException(
        `Рекрутер ${dto.recruiterId} уже назначен на вакансию ${dto.vacancyId}`,
      );
    }
    return this.recruiterVacancyRepository.create(dto);
  }

  async findAll() {
    return this.recruiterVacancyRepository.findAll();
  }

  async findById(id: string) {
    const assignment = await this.recruiterVacancyRepository.findById(id);
    if (!assignment) {
      throw new NotFoundException(`Назначение с ID ${id} не найдено`);
    }
    return assignment;
  }

  async findByRecruiterId(recruiterId: string) {
    return this.recruiterVacancyRepository.findByRecruiterId(recruiterId);
  }

  async findByVacancyId(vacancyId: string) {
    return this.recruiterVacancyRepository.findByVacancyId(vacancyId);
  }

  async update(id: string, dto: UpdateRecruiterVacancyDto) {
    await this.findById(id);
    return this.recruiterVacancyRepository.update(id, dto);
  }

  async updateResumeStats(id: string, dto: UpdateResumeStatsDto) {
    await this.findById(id);
    const count = dto.count ?? 1;

    switch (dto.action) {
      case ResumeAction.SENT:
        return this.recruiterVacancyRepository.incrementSentResumes(id, count);
      case ResumeAction.ACCEPTED:
        return this.recruiterVacancyRepository.incrementAcceptedResumes(
          id,
          count,
        );
      case ResumeAction.REJECTED:
        return this.recruiterVacancyRepository.incrementRejectedResumes(
          id,
          count,
        );
    }
  }

  async delete(id: string) {
    await this.findById(id);
    return this.recruiterVacancyRepository.delete(id);
  }
}
