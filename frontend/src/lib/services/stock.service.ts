import { Injectable } from '@angular/core';
import { AbstractEntityService } from '../classes/AbstractEntityService';
import { Stock } from '../models/stock.model';
import { ApiRequestService } from './api.service';

@Injectable()
export class StockService extends AbstractEntityService<Stock> {
  constructor(api: ApiRequestService) {
    super(api, 'stocks', 1, Stock);
  }
}
