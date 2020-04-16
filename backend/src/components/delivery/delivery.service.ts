import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Delivery } from '../../models/delivery.entity';

@Injectable()
export class DeliveryService extends TypeOrmCrudService<Delivery> {
  public constructor(@InjectRepository(Delivery) repo: Repository<Delivery>) {
    super(repo);
  }
}
