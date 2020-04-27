import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Delivery } from '../../models/delivery.entity';
import { User } from '../../models/user.entity';
import { DeliveryStatus } from '../../lib/interfaces/delivery-status.enum';

@Injectable()
export class DeliveryService extends TypeOrmCrudService<Delivery> {
  constructor(@InjectRepository(Delivery) repo: Repository<Delivery>) {
    super(repo);
  }

  public async changeStatus(
    user: User,
    deliveryId: number,
    status: DeliveryStatus,
  ): Promise<Delivery> {
    const delivery = await this.repo.findOneOrFail(deliveryId);
    const canConfirm = delivery.canConfirm(user);
    if (status === DeliveryStatus.CONFIRMED && !canConfirm)
      throw new ForbiddenException('You are not allowed to confirm delivery');

    delivery.status = status;
    return this.repo.save(delivery);
  }
}
