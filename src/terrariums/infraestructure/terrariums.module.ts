import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import {
  Terrariums,
  TerrariumsProfile,
  TerrariumsRepositoryImp,
} from './ports/mysql';
import { TerrariumsController } from './controllers/terrariums.controller';
import { TerrariumsService } from '../application/services/terrariums.service';
import { TerrariumsProfileRepositoryImp } from './ports/mysql/terrariumsProfileRepositoryImp';
import { DataSource } from 'typeorm';
import { RabbitMQModule } from 'src/shared/transports/rabbitMq.module';
import { BrokerModule } from 'src/broker/infraestructure/broker.module';

@Module({
  imports: [
    RabbitMQModule,
    BrokerModule,
    TypeOrmModule.forFeature([
      TerrariumsProfile,
      Terrariums,
      TerrariumsProfileRepositoryImp,
    ]),
  ],
  controllers: [TerrariumsController],
  providers: [
    TerrariumsService,
    {
      provide: getRepositoryToken(Terrariums),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource
          .getRepository(Terrariums)
          .extend(TerrariumsRepositoryImp);
      },
    },
  ],
})
export class TerrariumsModule {}
