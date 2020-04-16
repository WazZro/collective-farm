import { Controller } from '@nestjs/common';
import { Crud, Feature, CrudController } from '@nestjsx/crud';
import { Truck } from '../../models/truck.entity';
import { TruckCreateDto, TruckUpdateDto } from '../../lib/dto/truck.dto';
import { TruckService } from './truck.service';

@Crud({
  model: {
    type: Truck,
  },
  dto: {
    create: TruckCreateDto,
    update: TruckUpdateDto,
  },
  query: {
    join: {
      model: { eager: true, alias: 'md' },
      drivers: {},
    },
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('api/v1/trucks')
@Feature('Truck')
export class TruckController implements CrudController<Truck> {
  public constructor(public service: TruckService) {}
}
