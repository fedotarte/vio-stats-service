import { Injectable, NotFoundException } from '@nestjs/common';
import { VacancyRepository } from './repository/vacancy.repository';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async create(dto: CreateVacancyDto) {
    return this.vacancyRepository.create(dto);
  }

  async findAll() {
    return this.vacancyRepository.findAll();
  }

  async findById(id: string) {
    const vacancy = await this.vacancyRepository.findById(id);
    if (!vacancy) {
      throw new NotFoundException(`Вакансия с ID ${id} не найдена`);
    }
    return vacancy;
  }

  async findByCompanyId(companyId: string) {
    return this.vacancyRepository.findByCompanyId(companyId);
  }

  async update(id: string, dto: UpdateVacancyDto) {
    await this.findById(id);
    return this.vacancyRepository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.vacancyRepository.delete(id);
  }
}
