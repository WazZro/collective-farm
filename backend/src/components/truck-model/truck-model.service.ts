import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TruckModel } from '../../models/truck-model.entity';

@Injectable()
export class TruckModelService extends TypeOrmCrudService<TruckModel> {
  public constructor(
    @InjectRepository(TruckModel) repo: Repository<TruckModel>,
  ) {
    super(repo);
  }
}
