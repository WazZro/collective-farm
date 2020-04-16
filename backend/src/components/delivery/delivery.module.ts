import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { Delivery } from '../../models/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  providers: [DeliveryService],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
