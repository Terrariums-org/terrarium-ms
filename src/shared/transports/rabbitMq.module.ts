import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TERRARIUMS_QUEUE, RABBITMQ_SERVICE } from '../constants';
import { configService } from '../dto';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: configService.get('BROKER_HOST'),
          queue: TERRARIUMS_QUEUE.terrariumQueue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: configService.get('BROKER_HOST'),
          queue: TERRARIUMS_QUEUE.terrariumQueue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class RabbitMQModule {}
