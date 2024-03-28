import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const logger = new Logger('BootStrap');

  const app = await NestFactory.create(AppModule);

  // URI Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  });

  //Enable Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder().setTitle('Bookmarks API Documentation').setDescription('An API Documentation for the bookmarks API and its use').setVersion('1.0').addTag('bookmarks')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);

  // Listening the app of PORT
  const PORT = 3333;
  await app.listen(PORT);

  logger.log(`Application running on PORT ${PORT}`);
}
bootstrap();
