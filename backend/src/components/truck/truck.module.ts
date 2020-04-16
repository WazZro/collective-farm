import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckService } from './truck.service';
import { Truck } from '../../models/truck.entity';
import { TruckController } from './truck.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Truck])],
  providers: [TruckService],
  controllers: [TruckController],
})
export class TruckModule {}
