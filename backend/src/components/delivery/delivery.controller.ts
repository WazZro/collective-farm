import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Request } from 'express';
import { DeliveryCreateDto, DeliveryUpdateDto } from '../../lib/dto/delivery.dto';
import { Delivery } from '../../models/delivery.entity';
import { DeliveryService } from './delivery.service';
import { Role } from '../../lib/decorators/role.decorator';
import { UserRoles } from '../../lib/interfaces/user-role.enum';

@Crud({
  model: {
    type: Delivery,
  },
  dto: {
    create: DeliveryCreateDto,
    update: DeliveryUpdateDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
    createOneBase: {
      decorators: [Role(UserRoles.MANAGER)],
    },
    updateOneBase: {
      decorators: [Role(UserRoles.MANAGER)],
    },
    deleteOneBase: {
      decorators: [Role(UserRoles.MANAGER)],
    },
  },
  query: {
    join: {
      truck: { eager: true, alias: 'tr' },
      driver: { eager: true, alias: 'dr' },
      product: { eager: true, alias: 'pr' },
      stock: { eager: true, alias: 'st' },
      'stock.product': { eager: true, alias: 'st-pr' },
      'truck.model': { eager: true, alias: 'tr-md' },
    },
  },
})
@Controller('api/v1/deliveries')
export class DeliveryController implements CrudController<Delivery> {
  constructor(public service: DeliveryService) {
  }

  @Post(':id/status')
  @Role(UserRoles.MANAGER, UserRoles.DRIVER)
  public async changeStatus(
    @Param('id') id: number,
    @Req() request: Request,
    @Body() status: { status: number },
  ): Promise<Delivery> {
    return this.service.changeStatus(request.user as any, id, status.status);
  }
}
