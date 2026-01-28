import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';
import { UpdateVacancyDto } from '../dto/update-vacancy.dto';

@Injectable()
export class VacancyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateVacancyDto) {
    return this.prisma.vacancy.create({
      data: {
        title: data.title,
        description: data.description,
        deadline: data.deadline ? new Date(data.deadline) : null,
        companyId: data.companyId,
      },
      include: { company: true },
    });
  }

  async findAll() {
    return this.prisma.vacancy.findMany({
      orderBy: { createdAt: 'desc' },
      include: { company: true },
    });
  }

  async findById(id: string) {
    return this.prisma.vacancy.findUnique({
      where: { id },
      include: {
        company: true,
        recruiterVacancies: {
          include: { recruiter: true },
        },
      },
    });
  }

  async findByCompanyId(companyId: string) {
    return this.prisma.vacancy.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      include: { company: true },
    });
  }

  async update(id: string, data: UpdateVacancyDto) {
    return this.prisma.vacancy.update({
      where: { id },
      data: {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
      include: { company: true },
    });
  }

  async delete(id: string) {
    return this.prisma.vacancy.delete({
      where: { id },
    });
  }
}
