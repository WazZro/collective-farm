import { Injectable } from '@angular/core';
import { AbstractEntityService } from '../lib/classes/abstract-entity-service';
import { ApiRequestService } from './api.service';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService extends AbstractEntityService<Product> {
  constructor(api: ApiRequestService) {
    super(api, 'products', 1, Product);
  }
}
