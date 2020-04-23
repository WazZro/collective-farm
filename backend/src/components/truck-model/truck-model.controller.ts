import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { TruckModel } from '../../models/truck-model.entity';
import {
  TruckCreateModel,
  TruckUpdateModel,
} from '../../lib/dto/truck-model.dto';
import { TruckModelService } from './truck-model.service';

@Crud({
  model: {
    type: TruckModel,
  },
  dto: {
    create: TruckCreateModel,
    update: TruckUpdateModel,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('api/v1/truck-models')
export class TruckModelController implements CrudController<TruckModel> {
  constructor(public service: TruckModelService) {}
}
