import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { configService } from './shared/dto';
import { TERRARIUMS_QUEUE } from './shared/constants';

async function bootstrap() {
  const logger = new Logger('Main-Terrariums');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: configService.get('BROKER_HOST'),
        queue: TERRARIUMS_QUEUE.terrariumQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen();
  logger.log('Terrariums microservice started on port ');
}
bootstrap();
