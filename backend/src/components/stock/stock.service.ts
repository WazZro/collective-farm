import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../../models/stock.entity';

@Injectable()
export class StockService extends TypeOrmCrudService<Stock> {
  public constructor(@InjectRepository(Stock) repo: Repository<Stock>) {
    super(repo);
  }
}
