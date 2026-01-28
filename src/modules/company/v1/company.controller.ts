import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

@ApiTags('Компании (Клиенты)')
@Controller('api/v1/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Создать компанию' })
  @ApiResponse({
    status: 201,
    description: 'Компания создана',
    type: CompanyEntity,
  })
  async create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех компаний' })
  @ApiResponse({
    status: 200,
    description: 'Список компаний',
    type: [CompanyEntity],
  })
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить компанию по ID' })
  @ApiParam({ name: 'id', description: 'ID компании' })
  @ApiResponse({
    status: 200,
    description: 'Компания найдена',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  async findById(@Param('id') id: string) {
    return this.companyService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить компанию' })
  @ApiParam({ name: 'id', description: 'ID компании' })
  @ApiResponse({
    status: 200,
    description: 'Компания обновлена',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  async update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companyService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить компанию' })
  @ApiParam({ name: 'id', description: 'ID компании' })
  @ApiResponse({ status: 204, description: 'Компания удалена' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  async delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
