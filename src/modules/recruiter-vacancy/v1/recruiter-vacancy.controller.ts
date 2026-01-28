import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
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
import { RecruiterVacancyService } from './recruiter-vacancy.service';
import { CreateRecruiterVacancyDto } from './dto/create-recruiter-vacancy.dto';
import { UpdateRecruiterVacancyDto } from './dto/update-recruiter-vacancy.dto';
import { UpdateResumeStatsDto } from './dto/update-resume-stats.dto';
import { AssignedVacancyRecruiterDto } from './dto/assigned-vacancy-recruiter.dto';

@ApiTags('Назначения рекрутеров на вакансии')
@Controller('api/v1/recruiter-vacancies')
export class RecruiterVacancyController {
  constructor(
    private readonly recruiterVacancyService: RecruiterVacancyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Назначить рекрутера на вакансию' })
  @ApiResponse({
    status: 201,
    description: 'Рекрутер назначен на вакансию',
    type: AssignedVacancyRecruiterDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Рекрутер уже назначен на эту вакансию',
  })
  async create(@Body() dto: CreateRecruiterVacancyDto) {
    return this.recruiterVacancyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех назначений' })
  @ApiQuery({
    name: 'recruiterId',
    required: false,
    description: 'Фильтр по ID рекрутера',
  })
  @ApiQuery({
    name: 'vacancyId',
    required: false,
    description: 'Фильтр по ID вакансии',
  })
  @ApiResponse({
    status: 200,
    description: 'Список назначений',
    type: AssignedVacancyRecruiterDto,
    isArray: true,
  })
  async findAll(
    @Query('recruiterId') recruiterId?: string,
    @Query('vacancyId') vacancyId?: string,
  ) {
    if (recruiterId) {
      return this.recruiterVacancyService.findByRecruiterId(recruiterId);
    }
    if (vacancyId) {
      return this.recruiterVacancyService.findByVacancyId(vacancyId);
    }
    return this.recruiterVacancyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить назначение по ID' })
  @ApiParam({ name: 'id', description: 'ID назначения' })
  @ApiResponse({
    status: 200,
    description: 'Назначение найдено',
    type: AssignedVacancyRecruiterDto,
  })
  @ApiResponse({ status: 404, description: 'Назначение не найдено' })
  async findById(@Param('id') id: string) {
    return this.recruiterVacancyService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить назначение (все поля статистики)' })
  @ApiParam({ name: 'id', description: 'ID назначения' })
  @ApiResponse({
    status: 200,
    description: 'Назначение обновлено',
    type: AssignedVacancyRecruiterDto,
  })
  @ApiResponse({ status: 404, description: 'Назначение не найдено' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRecruiterVacancyDto,
  ) {
    return this.recruiterVacancyService.update(id, dto);
  }

  @Patch(':id/resume-stats')
  @ApiOperation({
    summary: 'Обновить статистику резюме (инкрементально)',
    description:
      'Позволяет инкрементально добавлять отправленные/принятые/отклоненные резюме',
  })
  @ApiParam({ name: 'id', description: 'ID назначения' })
  @ApiResponse({
    status: 200,
    description: 'Статистика обновлена',
    type: AssignedVacancyRecruiterDto,
  })
  @ApiResponse({ status: 404, description: 'Назначение не найдено' })
  async updateResumeStats(
    @Param('id') id: string,
    @Body() dto: UpdateResumeStatsDto,
  ) {
    return this.recruiterVacancyService.updateResumeStats(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить назначение рекрутера с вакансии' })
  @ApiParam({ name: 'id', description: 'ID назначения' })
  @ApiResponse({ status: 204, description: 'Назначение удалено' })
  @ApiResponse({ status: 404, description: 'Назначение не найдено' })
  async delete(@Param('id') id: string) {
    return this.recruiterVacancyService.delete(id);
  }
}
