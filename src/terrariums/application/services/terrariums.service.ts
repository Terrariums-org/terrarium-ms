import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateTerrariumDto } from '../../domain/dto';
import { TerrariumsInterface } from '../../domain/entities';
import { TerrariumsProfileRepositoryImp } from '../../infraestructure/ports/mysql/terrariumsProfileRepositoryImp';
import { InjectRepository } from '@nestjs/typeorm';
import { Terrariums } from '../../infraestructure/ports/mysql';
import { TerrariumPortRepository } from '../../infraestructure/entities/terrariumPortRepository';
import { RpcException } from '@nestjs/microservices';
import { BrokerService } from 'src/broker/application/services/broker.service';
import { QueueName } from 'src/broker/domain/entities';

@Injectable()
export class TerrariumsService {
  constructor(
    @InjectRepository(Terrariums)
    private readonly terrariumsRepository: TerrariumPortRepository,
    @Inject(TerrariumsProfileRepositoryImp)
    private readonly terrariumsProfileRepository: TerrariumsProfileRepositoryImp,
    @Inject(BrokerService) private readonly brokerService: BrokerService,
  ) {}

  async findAllByUser(id: number): Promise<TerrariumsInterface[]> {
    try {
      const terrariums = await this.terrariumsRepository.findAllByOption({
        user: {
          id,
        },
      });
      if (!terrariums.length) {
        throw new RpcException({
          status: HttpStatus.NO_CONTENT,
          message: 'No hay terrarios registrados',
        });
      }
      return terrariums;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOneById(id: number): Promise<TerrariumsInterface> {
    try {
      const terrarium = await this.terrariumsRepository.findOneByOption({ id });
      if (!terrarium) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'Terrario no encontrado',
        });
      }
      return terrarium;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async create(
    createTerrariumDto: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      const terrarium =
        await this.terrariumsRepository.save(createTerrariumDto);
      const reqTerrariumToQueue = {
        ...terrarium.terrariumProfile,
        id: terrarium.id,
        codeEsp: terrarium.codeEsp,
      };
      console.log(reqTerrariumToQueue)
      await this.brokerService.sendMessage(
        reqTerrariumToQueue,
        QueueName.CONSUME_TERRARIUM,
      );
      return terrarium;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result =
        (await this.terrariumsRepository.delete(id)) &&
        (await this.terrariumsProfileRepository.delete(id));
      if (!result.raw) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'Terrario no encontrado',
        });
      }
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
