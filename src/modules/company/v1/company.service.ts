import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(dto: CreateCompanyDto) {
    return this.companyRepository.create(dto);
  }

  async findAll() {
    return this.companyRepository.findAll();
  }

  async findById(id: string) {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new NotFoundException(`Компания с ID ${id} не найдена`);
    }
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto) {
    await this.findById(id);
    return this.companyRepository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.companyRepository.delete(id);
  }
}
