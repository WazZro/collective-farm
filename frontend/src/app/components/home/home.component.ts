import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public menu = [
    {
      label: 'Пользователи',
      route: '/users',
    },
    {
      label: 'Продукты',
      route: '/products'
    },
    {
      label: 'Модели грузовиков',
      route: '/truck-models'
    },
    {
      label: 'Грузовики',
      route: '/trucks'
    },
    {
      label: 'Склады',
      route: '/stocks'
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
