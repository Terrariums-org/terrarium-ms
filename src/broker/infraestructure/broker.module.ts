import { Module } from '@nestjs/common';

import { BrokerService } from '../application/services/broker.service';
import { AmqpLibPort } from './ports/AmqpLib';

@Module({
  providers: [BrokerService, AmqpLibPort],
  exports: [BrokerService, AmqpLibPort],
})
export class BrokerModule {}
