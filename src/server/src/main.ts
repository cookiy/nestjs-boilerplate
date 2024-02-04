import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './filters/error/http-exception.filter';
import { LogInterceptor } from './interceptors/log/log.interceptor';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { ReportLogger } from './interceptors/log/ReportLogger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './filters/error/all-exception.filter';

const fs = require('fs');
const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('nest admin boilerplate')
    .setDescription('nest admin boilerplate 的 API 文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
};

async function bootstrap() {
  const reportLogger = new ReportLogger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
    bufferLogs: true,
    logger: reportLogger,
  });

  app.useStaticAssets(join(__dirname, '..', 'upload_dist'));

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor(),
  );

  setupSwagger(app);

  await app.listen(8899);
}

bootstrap();
