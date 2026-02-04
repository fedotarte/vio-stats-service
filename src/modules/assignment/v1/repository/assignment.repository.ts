import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';
import { UpdateAssignmentDto } from '../dto/update-assignment.dto';

@Injectable()
export class AssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAssignmentDto) {
    return this.prisma.recruiterVacancy.create({
      data: {
        recruiterId: data.recruiterId,
        vacancyId: data.vacancyId,
        requiredResumes: data.requiredResumes ?? 0,
      },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.recruiterVacancy.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.recruiterVacancy.findUnique({
      where: { id },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async findByRecruiterId(recruiterId: string) {
    return this.prisma.recruiterVacancy.findMany({
      where: { recruiterId },
      orderBy: { createdAt: 'desc' },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async findByVacancyId(vacancyId: string) {
    return this.prisma.recruiterVacancy.findMany({
      where: { vacancyId },
      orderBy: { createdAt: 'desc' },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async findByRecruiterAndVacancy(recruiterId: string, vacancyId: string) {
    return this.prisma.recruiterVacancy.findUnique({
      where: {
        recruiterId_vacancyId: { recruiterId, vacancyId },
      },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async update(id: string, data: UpdateAssignmentDto) {
    return this.prisma.recruiterVacancy.update({
      where: { id },
      data,
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async incrementSentResumes(id: string, count: number = 1) {
    return this.prisma.recruiterVacancy.update({
      where: { id },
      data: { sentResumes: { increment: count } },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async incrementAcceptedResumes(id: string, count: number = 1) {
    return this.prisma.recruiterVacancy.update({
      where: { id },
      data: { acceptedResumes: { increment: count } },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async incrementRejectedResumes(id: string, count: number = 1) {
    return this.prisma.recruiterVacancy.update({
      where: { id },
      data: { rejectedResumes: { increment: count } },
      include: {
        recruiter: true,
        vacancy: { include: { company: true } },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.recruiterVacancy.delete({
      where: { id },
    });
  }
}
