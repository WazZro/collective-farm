import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../models/product.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  public constructor(@InjectRepository(Product) repo: Repository<Product>) {
    super(repo);
  }
}
