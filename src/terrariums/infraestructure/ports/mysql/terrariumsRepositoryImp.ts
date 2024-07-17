import { TerrariumsInterface } from '../../../domain/entities';
import { TerrariumPortRepository } from '../../entities/terrariumPortRepository';
import { Repository } from 'typeorm';
import { Terrariums } from './terrariums.entity';
import { UpdateTerrariumDto } from '../../../domain/dto';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TerrariumsRepositoryImp: Pick<TerrariumPortRepository, any> = {
  async findAllByOption(
    this: Repository<Terrariums>,
    options: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface[]> {
    try {
      const terrariums = await this.find({
        where: options,
        relations: {
          user: true,
          terrariumProfile: true,
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
  },

  async findOneByOption(
    this: Repository<Terrariums>,
    options: UpdateTerrariumDto,
  ): Promise<TerrariumsInterface> {
    try {
      const terrariums = await this.findOne({
        where: options,
        relations: {
          user: true,
          terrariumProfile: true,
        },
      });
      if (!terrariums) {
        throw new RpcException({
          status: HttpStatus.NO_CONTENT,
          message: 'No existe este terrario',
        });
      }
      return terrariums;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  },
};
