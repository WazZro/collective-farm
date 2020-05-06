import { Component, OnInit } from '@angular/core';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { DeliveryStatus } from '../../../models/delivery.model';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  menu = [
    {
      label: 'Пользователи',
      route: '/users',
    },
    {
      label: 'Продукты',
      route: '/products',
    },
    {
      label: 'Модели грузовиков',
      route: '/truck-models',
    },
    {
      label: 'Грузовики',
      route: '/trucks',
    },
    {
      label: 'Склады',
      route: '/stocks',
    },
    {
      label: 'Поставки',
      route: '/deliveries',
    },
  ];

  needConfirmDeliveryRequest = RequestQueryBuilder.create()
    .search({ status: { $eq: DeliveryStatus.WAIT_CONFIRM + '' } })
    .setJoin({ field: 'driver' })
    .setJoin({ field: 'stock' })
    .setJoin({ field: 'stock.product' })
    .setJoin({ field: 'product' })
    .setJoin({ field: 'truck' })
    .setJoin({ field: 'truck.model' });

  transitDeliveryRequest = RequestQueryBuilder.create()
    .search({ status: { $eq: DeliveryStatus.TRANSIT + '' } })
    .setJoin({ field: 'driver' })
    .setJoin({ field: 'stock' })
    .setJoin({ field: 'stock.product' })
    .setJoin({ field: 'product' })
    .setJoin({ field: 'truck' })
    .setJoin({ field: 'truck.model' });

  constructor() {}

  ngOnInit(): void {}
}
