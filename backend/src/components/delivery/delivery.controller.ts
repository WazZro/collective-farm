import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import {
  DeliveryCreateDto,
  DeliveryUpdateDto,
} from '../../lib/dto/delivery.dto';
import { Delivery } from '../../models/delivery.entity';
import { DeliveryService } from './delivery.service';

@Crud({
  model: {
    type: Delivery,
  },
  dto: {
    create: DeliveryCreateDto,
    update: DeliveryUpdateDto,
  },
})
@Controller('api/v1/deliveries')
export class DeliveryController implements CrudController<Delivery> {
  public constructor(public service: DeliveryService) {}
}
