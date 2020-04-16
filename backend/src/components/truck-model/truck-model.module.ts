import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruckModelService } from './truck-model.service';
import { TruckModel } from '../../models/truck-model.entity';
import { TruckModelController } from './truck-model.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TruckModel])],
  providers: [TruckModelService],
  controllers: [TruckModelController],
})
export class TruckModelModule {}
