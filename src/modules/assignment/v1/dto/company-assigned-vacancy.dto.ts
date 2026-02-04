import { ApiProperty } from '@nestjs/swagger';

export class CompanyAssignedVacancyDto {
  @ApiProperty({
    description:
      'Идентификатор компании-клиента, ваканасия от которого была назначена на рекрутера',
  })
  id: string;

  @ApiProperty({
    description:
      'Название компании-клиента, ваканасия от которого была назначена на рекрутера',
  })
  name: string;
}
