import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NODE_ENV, PORT } from './config/env';

async function generateDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Glowme Business API')
    .setDescription('API managing resources related dashboard provider')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  if (NODE_ENV !== 'production') {
    generateDocumentation(app);
  }

  await app.listen(PORT);
}
bootstrap();
