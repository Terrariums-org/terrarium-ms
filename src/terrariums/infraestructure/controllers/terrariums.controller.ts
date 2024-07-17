import { Controller, Inject } from '@nestjs/common';
import { TerrariumsService } from '../../application/services/terrariums.service';
import { CreateTerrariumDto } from '../../domain/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TERRARIUMS_QUEUE } from 'src/shared/constants';

@Controller()
export class TerrariumsController {
  constructor(
    @Inject(TerrariumsService)
    private readonly terrariumsService: TerrariumsService,
  ) {}

  @MessagePattern({ cmd: TERRARIUMS_QUEUE.createTerrarium })
  create(@Payload() createTerrariumDto: CreateTerrariumDto) {
    return this.terrariumsService.create(createTerrariumDto);
  }

  @MessagePattern({ cmd: TERRARIUMS_QUEUE.findAllByUser })
  findAllByUser(@Payload() id: number) {
    return this.terrariumsService.findAllByUser(id);
  }

  @MessagePattern({ cmd: TERRARIUMS_QUEUE.findOne })
  findOne(@Payload() id: number) {
    return this.terrariumsService.findOneById(id);
  }

  @MessagePattern({ cmd: TERRARIUMS_QUEUE.delete })
  remove(@Payload() id: number) {
    return this.terrariumsService.remove(id);
  }
}
