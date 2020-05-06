import { Injectable } from '@angular/core';
import { AbstractEntityService } from '../lib/classes/abstract-entity-service';
import { Delivery, DeliveryStatus } from '../models/delivery.model';
import { ApiRequestService } from './api.service';
import { environment } from '../environments/environment';

@Injectable()
export class DeliveryService extends AbstractEntityService<Delivery> {
  constructor(api: ApiRequestService) {
    super(api, 'deliveries', 1, Delivery);
  }

  public changeStatus(delivery: Delivery, newStatus: DeliveryStatus): Promise<Delivery> {
    return this.apiService.createRequest<Delivery>({
      method: 'post',
      url: `${environment.API}/v1/deliveries/${delivery.id}/status`,
      body: {
        status: newStatus,
      },
    }).toPromise();
  }
}
