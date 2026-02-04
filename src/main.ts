import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Глобальная валидация DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Настройка Swagger (только если SWAGGER_ENABLED=true)
  if (process.env.SWAGGER_ENABLED === 'true') {
    const config = new DocumentBuilder()
      .setTitle('VIO Stats Service API')
      .setDescription('API для управления компаниями, рекрутерами и вакансиями')
      .setVersion('1.0')
      .addBasicAuth()
      .addTag('Компании (Клиенты)', 'Управление компаниями-клиентами')
      .addTag('Рекрутеры', 'Управление рекрутерами')
      .addTag('Вакансии', 'Управление вакансиями')
      .addTag(
        'Назначения рекрутеров на вакансии',
        'Управление назначениями и статистикой работы рекрутеров',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    // Применяем Basic Auth глобально ко всем эндпоинтам
    document.security = [{ basic: [] }];
    SwaggerModule.setup('api-docs', app, document);
  }

  // CORS
  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  const port = process.env.PORT || 5001;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  if (process.env.SWAGGER_ENABLED === 'true') {
    console.log(`📚 Swagger documentation: http://localhost:${port}/api-docs`);
  }
}
//eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
