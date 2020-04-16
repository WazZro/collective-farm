import { Controller } from '@nestjs/common';
import { Crud, Feature, CrudController } from '@nestjsx/crud';
import { Stock } from '../../models/stock.entity';
import { StockCreateDto, StockUpdateDto } from '../../lib/dto/stock.dto';
import { StockService } from './stock.service';

@Crud({
  model: {
    type: Stock,
  },
  dto: {
    create: StockCreateDto,
    update: StockUpdateDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
  query: {
    join: {
      product: { eager: true, alias: 'pr' },
    },
  },
})
@Controller('/api/v1/stocks')
@Feature('Stock')
export class StockController implements CrudController<Stock> {
  public constructor(public service: StockService) {}
}
