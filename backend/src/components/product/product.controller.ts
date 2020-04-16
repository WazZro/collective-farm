import { Controller } from '@nestjs/common';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { Product } from '../../models/product.entity';
import { ProductCreateDto, ProductUpdateDto } from '../../lib/dto/product.dto';
import { ProductService } from './product.service';

@Crud({
  model: {
    type: Product,
  },
  dto: {
    create: ProductCreateDto,
    update: ProductUpdateDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Feature('Product')
@Controller('api/v1/products')
export class ProductController implements CrudController<Product> {
  public constructor(public service: ProductService) {}
}
