/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractCreateComponent } from '../../../../lib/classes/abstract-create-component';
import { Delivery } from '../../../../models/delivery.model';
import { DeliveryService } from '../../../../services/delivery.service';
import { getEntityStreamNew, getMessageFromError } from '../../../../lib/utils';
import { DELIVERY_TYPE_MAP } from '../../../../lib/constants';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../../../models/product.model';
import { Stock } from '../../../../models/stock.model';
import { Truck } from '../../../../models/truck.model';
import { ProductService } from '../../../../services/product.service';
import { StockService } from '../../../../services/stock.service';
import { TruckService } from '../../../../services/truck.service';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { map } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-delivery-create-dialog',
  templateUrl: 'delivery-create-dialog.html',
})
export class DeliveryCreateDialogComponent extends AbstractCreateComponent<
  Delivery
> implements OnInit {
  deliveryCreateForm: FormGroup = new FormGroup({
    type: new FormControl(undefined, [Validators.required]),
    product: new FormControl(undefined, [Validators.required]),
    stock: new FormControl(undefined, [Validators.required]),
    truck: new FormControl(undefined, [Validators.required]),
    driver: new FormControl(undefined, [Validators.required]),
    volume: new FormControl(undefined, [Validators.required]),
    deliveryDate: new FormControl(undefined, [Validators.required]),
  });
  deliveryTypeMap = DELIVERY_TYPE_MAP;

  productStream: Observable<Product[]> = null;
  productInputStream = new Subject<string>();
  stockStream: Observable<Stock[]> = null;
  truckStream: Observable<Truck[]> = null;
  userStream: Observable<User[]> = null;

  constructor(
    deliveryService: DeliveryService,
    dialogRef: MatDialogRef<DeliveryCreateDialogComponent>,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private stockService: StockService,
    private truckService: TruckService,
    private userService: UserService,
  ) {
    super(deliveryService, dialogRef);
  }

  public ngOnInit(): void {
    this.productStream = getEntityStreamNew({
      service: this.productService,
      formControlStream: this.productInputStream,
      initialValue: this.productService.get() as Promise<Product[]>,
      defaultQueryBuilder: RequestQueryBuilder.create().setLimit(25),
      filterFn: input => ({ name: { $eq: input } }),
    });

    this.stockStream = getEntityStreamNew({
      service: this.stockService,
      formControlStream: this.deliveryCreateForm
        .get('product').valueChanges.pipe(map(product => product.name)),
      defaultQueryBuilder: RequestQueryBuilder.create().setJoin({ field: 'product' }),
      filterFn: productName => ({ 'pr.name': { $eq: productName } }),
      initialValue: [],
    });

    this.truckStream = getEntityStreamNew({
      service: this.truckService,
      formControlStream: this.deliveryCreateForm.get('volume').valueChanges,
      filterFn: volume => ({ 'md.capacity': { $gte: volume } }),
      defaultQueryBuilder: RequestQueryBuilder.create().setJoin({ field: 'model' }),
    });

    this.userStream = getEntityStreamNew({
      service: this.userService,
      formControlStream: this.deliveryCreateForm.get('truck').valueChanges.pipe(
        map(truck => truck.id),
      ),
      filterFn: truckId => ({ 'trucks.id': { $eq: truckId } }),
      defaultQueryBuilder: RequestQueryBuilder.create().setJoin({ field: 'trucks' }),
    });
  }

  public async create(): Promise<void> {
    const delivery = this.deliveryCreateForm.value;
    delivery.type = Number.parseInt(delivery.type, 10);
    try {
      const created = await this.service.create(delivery);
      this.modalClose(created);
    } catch (e) {
      const message = getMessageFromError(e);
      this.snackBar.open(message, null, { duration: 3000 });
    }
  }
}
