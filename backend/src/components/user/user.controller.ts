import { Controller } from '@nestjs/common';
import { CrudController, Crud, Feature } from '@nestjsx/crud';
import { User } from '../../models/user.entity';
import { UserDto, UserUpdateDto } from '../../lib/dto/user.dto';
import { UserService } from './user.service';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserDto,
    update: UserUpdateDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('/api/v1/users')
@Feature('User')
export class UserController implements CrudController<User> {
  public constructor(public service: UserService) {}

  private get base(): CrudController<User> {
    return this;
  }
}
