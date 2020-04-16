import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Truck } from '../../models/truck.entity';

@Injectable()
export class TruckService extends TypeOrmCrudService<Truck> {
  public constructor(@InjectRepository(Truck) repo: Repository<Truck>) {
    super(repo);
  }
}
