import { connect } from 'amqplib/callback_api';
import { QueueRequest } from '../../domain/entities';
import { QueueRepository } from '../../domain/repository/QueueRepository';
import { Connection } from 'amqplib/callback_api';
import { Channel } from 'amqplib/callback_api';
import { HttpStatus, Injectable } from '@nestjs/common';
import { configService } from 'src/shared/dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AmqpLibPort implements QueueRepository {
  private readonly url: string = configService.get('BROKER_HOST');

  connectionBroker(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      connect(this.url, (err: any, conn: Connection) => {
        if (err) reject(err);
        resolve(conn);
      });
    });
  }

  async createChannel(): Promise<Channel> {
    try {
      const conn = await this.connectionBroker();
      return new Promise<Channel>((resolve, reject) => {
        conn.createChannel((errChanel: any, channel: Channel) => {
          if (errChanel) reject(errChanel);
          resolve(channel);
        });
      });
    } catch (err: any) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
  }

  async sendMessageToChannel(req: QueueRequest): Promise<void> {
    const { queueName, content } = req;
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(queueName);
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)));
      console.log('message send: ' + content);
    } catch (err: any) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
  }
}
