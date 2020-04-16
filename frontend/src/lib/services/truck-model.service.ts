import { Injectable } from '@angular/core';
import { AbstractEntityService } from '../classes/AbstractEntityService';
import { TruckModel } from '../models/truck-model.model';
import { ApiRequestService } from './api.service';

@Injectable()
export class TruckModelService extends AbstractEntityService<TruckModel> {
  constructor(api: ApiRequestService) {
    super(api, 'truck-models', 1, TruckModel);
  }
}
