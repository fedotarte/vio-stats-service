import { Injectable, NotFoundException } from '@nestjs/common';
import { RecruiterRepository } from './repository/recruiter.repository';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Injectable()
export class RecruiterService {
  constructor(private readonly recruiterRepository: RecruiterRepository) {}

  async create(dto: CreateRecruiterDto) {
    return this.recruiterRepository.create(dto);
  }

  async findAll(search?: string) {
    return this.recruiterRepository.findAll(search);
  }

  async findById(id: string) {
    const recruiter = await this.recruiterRepository.findById(id);
    if (!recruiter) {
      throw new NotFoundException(`Рекрутер с ID ${id} не найден`);
    }
    return recruiter;
  }

  async update(id: string, dto: UpdateRecruiterDto) {
    await this.findById(id);
    return this.recruiterRepository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.recruiterRepository.delete(id);
  }
}
