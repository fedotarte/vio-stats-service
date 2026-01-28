import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateRecruiterDto } from '../dto/create-recruiter.dto';
import { UpdateRecruiterDto } from '../dto/update-recruiter.dto';

@Injectable()
export class RecruiterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRecruiterDto) {
    return this.prisma.recruiter.create({ data });
  }

  async findAll() {
    return this.prisma.recruiter.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.recruiter.findUnique({
      where: { id },
      include: { recruiterVacancies: true },
    });
  }

  async update(id: string, data: UpdateRecruiterDto) {
    return this.prisma.recruiter.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.recruiter.delete({
      where: { id },
    });
  }
}
