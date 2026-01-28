import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule, BasicAuthGuard } from './auth';
import { CompanyModule } from './modules/company/v1/company.module';
import { RecruiterModule } from './modules/recruiter/v1/recruiter.module';
import { VacancyModule } from './modules/vacancy/v1/vacancy.module';
import { RecruiterVacancyModule } from './modules/recruiter-vacancy/v1/recruiter-vacancy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    CompanyModule,
    RecruiterModule,
    VacancyModule,
    RecruiterVacancyModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
  ],
})
export class AppModule {}
