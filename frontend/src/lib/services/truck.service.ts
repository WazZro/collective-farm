import { Injectable } from '@angular/core';
import { AbstractEntityService } from '../classes/AbstractEntityService';
import { Truck } from '../models/truck.model';
import { ApiRequestService } from './api.service';

@Injectable()
export class TruckService extends AbstractEntityService<Truck> {
  constructor(api: ApiRequestService) {
    super(api, 'trucks', 1, Truck);
  }
}
