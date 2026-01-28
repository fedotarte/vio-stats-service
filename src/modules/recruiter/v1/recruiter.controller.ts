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
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { RecruiterEntity } from './entities/recruiter.entity';

@ApiTags('Рекрутеры')
@Controller('api/v1/recruiters')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  @ApiOperation({ summary: 'Создать рекрутера' })
  @ApiResponse({
    status: 201,
    description: 'Рекрутер создан',
    type: RecruiterEntity,
  })
  async create(@Body() dto: CreateRecruiterDto) {
    return this.recruiterService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех рекрутеров' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список рекрутеров',
    type: [RecruiterEntity],
  })
  async findAll() {
    return this.recruiterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить рекрутера по ID' })
  @ApiParam({ name: 'id', description: 'ID рекрутера' })
  @ApiResponse({
    status: 200,
    description: 'Рекрутер найден',
    type: RecruiterEntity,
  })
  @ApiResponse({ status: 404, description: 'Рекрутер не найден' })
  async findById(@Param('id') id: string) {
    return this.recruiterService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить рекрутера' })
  @ApiParam({ name: 'id', description: 'ID рекрутера' })
  @ApiResponse({
    status: 200,
    description: 'Рекрутер обновлен',
    type: RecruiterEntity,
  })
  @ApiResponse({ status: 404, description: 'Рекрутер не найден' })
  async update(@Param('id') id: string, @Body() dto: UpdateRecruiterDto) {
    return this.recruiterService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить рекрутера' })
  @ApiParam({ name: 'id', description: 'ID рекрутера' })
  @ApiResponse({ status: 204, description: 'Рекрутер удален' })
  @ApiResponse({ status: 404, description: 'Рекрутер не найден' })
  async delete(@Param('id') id: string) {
    return this.recruiterService.delete(id);
  }
}
