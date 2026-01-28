import { ApiProperty } from '@nestjs/swagger';

export class RecruiterVacancyEntity {
  @ApiProperty({ description: 'Уникальный идентификатор назначения' })
  id: string;

  @ApiProperty({ description: 'ID рекрутера' })
  recruiterId: string;

  @ApiProperty({ description: 'ID вакансии' })
  vacancyId: string;

  @ApiProperty({ description: 'Количество необходимых резюме' })
  requiredResumes: number;

  @ApiProperty({ description: 'Количество отправленных резюме' })
  sentResumes: number;

  @ApiProperty({ description: 'Количество принятых резюме' })
  acceptedResumes: number;

  @ApiProperty({ description: 'Количество отклоненных резюме' })
  rejectedResumes: number;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления' })
  updatedAt: Date;
}

// export class RecruiterVacancyWithRelationsEntity extends RecruiterVacancyEntity {
//   @ApiProperty({ description: 'Данные рекрутера' })
//   recruiter: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//   };
//
//   @ApiProperty({ description: 'Данные вакансии' })
//   vacancy: {
//     id: string;
//     title: string;
//     deadline: Date | null;
//     company: {
//       id: string;
//       name: string;
//     };
//   };
// }
