import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { TruckModelComponent } from './components/truck-model/truck-model.component';
import { UserComponent } from './components/user/user.component';
import { TruckComponent } from './components/truck/truck.component';
import { StockComponent } from './components/stock/stock.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'truck-models',
    component: TruckModelComponent,
  },
  {
    path: 'trucks',
    component: TruckComponent,
  },
  {
    path: 'stocks',
    component: StockComponent,
  },
  {
    path: 'deliveries',
    component: DeliveryComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
