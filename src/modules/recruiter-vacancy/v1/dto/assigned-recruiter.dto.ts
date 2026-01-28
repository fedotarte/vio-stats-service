import { ApiProperty } from '@nestjs/swagger';

export class AssignedRecruiterDto {
  @ApiProperty({
    description: 'Идентификатор рекрутера, назначенного на вакансию',
  })
  id: string;

  @ApiProperty({
    description: 'Имя рекрутера, назначенного на вакансию',
  })
  firstName: string;

  @ApiProperty({
    description: 'Фамилия рекрутера, назначенного на вакансию',
  })
  lastName: string;

  @ApiProperty({
    description: 'email рекрутера, назначенного на вакансию',
  })
  email: string;
}
