import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { BullModule } from '@nestjs/bull';

import { OptimizeProducer } from './optimize.producer';
import { StrengthenProducer } from './strengthen.producer';
import { MongooseModule } from '@nestjs/mongoose';
import { Strengthen, StrengthenSchema } from '@gnosys/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Strengthen.name, schema: StrengthenSchema },
    ]),
    BullModule.registerQueue(
      {
        name: 'optimize',
      },
      { name: 'imsafer-strengthen' }
    ),
  ],
  controllers: [OptimizeController],
  providers: [OptimizeProducer, StrengthenProducer],
})
export class OptimizeModule {}
