import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyEntity } from './entities/vacancy.entity';

@ApiTags('Вакансии')
@Controller('api/v1/vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  @ApiOperation({ summary: 'Создать вакансию' })
  @ApiResponse({
    status: 201,
    description: 'Вакансия создана',
    type: VacancyEntity,
  })
  async create(@Body() dto: CreateVacancyDto) {
    return this.vacancyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех вакансий' })
  @ApiQuery({
    name: 'companyId',
    required: false,
    description: 'Фильтр по ID компании',
  })
  @ApiResponse({
    status: 200,
    description: 'Список вакансий',
    type: [VacancyEntity],
  })
  async findAll(@Query('companyId') companyId?: string) {
    if (companyId) {
      return this.vacancyService.findByCompanyId(companyId);
    }
    return this.vacancyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить вакансию по ID' })
  @ApiParam({ name: 'id', description: 'ID вакансии' })
  @ApiResponse({
    status: 200,
    description: 'Вакансия найдена',
    type: VacancyEntity,
  })
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' })
  async findById(@Param('id') id: string) {
    return this.vacancyService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить вакансию' })
  @ApiParam({ name: 'id', description: 'ID вакансии' })
  @ApiResponse({
    status: 200,
    description: 'Вакансия обновлена',
    type: VacancyEntity,
  })
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' })
  async update(@Param('id') id: string, @Body() dto: UpdateVacancyDto) {
    return this.vacancyService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить вакансию' })
  @ApiParam({ name: 'id', description: 'ID вакансии' })
  @ApiResponse({ status: 204, description: 'Вакансия удалена' })
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' })
  async delete(@Param('id') id: string) {
    return this.vacancyService.delete(id);
  }
}
