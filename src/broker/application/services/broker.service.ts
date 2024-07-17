import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { QueueContent, QueueName, QueueRequest } from '../../domain/entities';
import { AmqpLibPort } from 'src/broker/infraestructure/ports/AmqpLib';
import { QueueRepository } from 'src/broker/domain/repository/QueueRepository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BrokerService {
  constructor(
    @Inject(AmqpLibPort) private readonly queueRepository: QueueRepository,
  ) {}
  async sendMessage(data: QueueContent, queueName: QueueName) {
    try {
      const reqQueue: QueueRequest = {
        queueName: queueName,
        content: data,
      };
      this.queueRepository.sendMessageToChannel(reqQueue);
    } catch (err: any) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
  }
}
