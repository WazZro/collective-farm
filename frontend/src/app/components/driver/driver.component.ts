import { Component, OnInit } from '@angular/core';
import { CondOperator, RequestQueryBuilder } from '@nestjsx/crud-request';
import { UserService } from '../../../services/user.service';
import { TruckService } from '../../../services/truck.service';
import { User } from '../../../models/user.model';
import { Truck } from '../../../models/truck.model';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {
  currentDriver: User = null;
  driverTrucks: Truck[] = [];
  deliveryRequest: RequestQueryBuilder = null;
  columnTruckList: string[] = [
    'id',
    'registrationNumber',
    'brand',
    'model',
    'buildYear',
    'capacity',
  ];

  constructor(
    private userService: UserService,
    private truckService: TruckService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.currentDriver = this.userService.user;
    this.driverTrucks = (await this.truckService.get(
      RequestQueryBuilder.create()
        .setJoin({ field: 'model' })
        .setJoin({ field: 'drivers' })
        .setFilter({
          field: 'drivers.id',
          operator: CondOperator.EQUALS,
          value: this.currentDriver.id,
        })
        .query(),
    )) as Truck[];

    this.deliveryRequest = RequestQueryBuilder.create()
      .setJoin({ field: 'driver' })
      .setJoin({ field: 'stock' })
      .setJoin({ field: 'stock.product' })
      .setJoin({ field: 'product' })
      .setJoin({ field: 'truck' })
      .setJoin({ field: 'truck.model' })
      .setLimit(25)
      .setPage(1)
      .setFilter({
        field: 'dr.id',
        operator: CondOperator.EQUALS,
        value: this.currentDriver.id,
      });
  }
}
