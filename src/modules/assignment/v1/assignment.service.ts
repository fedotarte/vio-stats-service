import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AssignmentRepository } from './repository/assignment.repository';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import {
  UpdateResumeStatsDto,
  ResumeAction,
} from './dto/update-resume-stats.dto';

@Injectable()
export class AssignmentService {
  constructor(private readonly assignmentRepository: AssignmentRepository) {}

  async create(dto: CreateAssignmentDto) {
    // Проверяем, не существует ли уже такая связка
    const existing = await this.assignmentRepository.findByRecruiterAndVacancy(
      dto.recruiterId,
      dto.vacancyId,
    );
    if (existing) {
      throw new ConflictException(
        `Рекрутер ${dto.recruiterId} уже назначен на вакансию ${dto.vacancyId}`,
      );
    }
    return this.assignmentRepository.create(dto);
  }

  async findAll() {
    return this.assignmentRepository.findAll();
  }

  async findById(id: string) {
    const assignment = await this.assignmentRepository.findById(id);
    if (!assignment) {
      throw new NotFoundException(`Назначение с ID ${id} не найдено`);
    }
    return assignment;
  }

  async findByRecruiterId(recruiterId: string) {
    return this.assignmentRepository.findByRecruiterId(recruiterId);
  }

  async findByVacancyId(vacancyId: string) {
    return this.assignmentRepository.findByVacancyId(vacancyId);
  }

  async update(id: string, dto: UpdateAssignmentDto) {
    await this.findById(id);
    return this.assignmentRepository.update(id, dto);
  }

  async updateResumeStats(id: string, dto: UpdateResumeStatsDto) {
    await this.findById(id);
    const count = dto.count ?? 1;

    switch (dto.action) {
      case ResumeAction.SENT:
        return this.assignmentRepository.incrementSentResumes(id, count);
      case ResumeAction.ACCEPTED:
        return this.assignmentRepository.incrementAcceptedResumes(id, count);
      case ResumeAction.REJECTED:
        return this.assignmentRepository.incrementRejectedResumes(id, count);
    }
  }

  async delete(id: string) {
    await this.findById(id);
    return this.assignmentRepository.delete(id);
  }
}
