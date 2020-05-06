import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User, UserRoles } from '../../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User = null;

  public get isDriver(): boolean {
    return this.user.role === UserRoles.DRIVER;
  }

  public get isManager(): boolean {
    return this.user.role === UserRoles.MANAGER;
  }

  public get isAccountant(): boolean {
    return this.user.role === UserRoles.ACCOUNTANT;
  }

  public get isAdmin(): boolean {
    return this.user.role === UserRoles.ADMIN;
  }

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

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.user = this.userService.user;
  }
}
