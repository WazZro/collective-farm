import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
// import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { ProductService } from '../lib/services/product.service';
import { StockService } from '../lib/services/stock.service';
import { TruckModelService } from '../lib/services/truck-model.service';
import { TruckService } from '../lib/services/truck.service';
import { UserService } from '../lib/services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCreateDialogComponent } from './components/product/actions/product-create-dialog.component';
import { ProductUpdateDialogComponent } from './components/product/actions/product-update-dialog.component';
import { ProductComponent } from './components/product/product.component';
import { StockCreateDialogComponent } from './components/stock/actions/stock-create-dialog.component';
import { StockUpdateDialogComponent } from './components/stock/actions/stock-update-dialog.component';
import { StockComponent } from './components/stock/stock.component';
import { TruckModelCreateDialogComponent } from './components/truck-model/actions/truck-model-create-dialog.component';
import { TruckModelUpdateDialogComponent } from './components/truck-model/actions/truck-model-update-dialog.component';
import { TruckModelComponent } from './components/truck-model/truck-model.component';
import { TruckCreateDialogComponent } from './components/truck/actions/truck-create-dialog.component';
import { TruckUpdateDialogComponent } from './components/truck/actions/truck-update-dialog.component';
import { TruckComponent } from './components/truck/truck.component';
import { UserCreateDialogComponent } from './components/user/actions/user-create-dialog.component';
import { UserUpdateDialogComponent } from './components/user/actions/user-update-dialog.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    // StockComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent,
    UserCreateDialogComponent,
    UserUpdateDialogComponent,
    ProductComponent,
    ProductCreateDialogComponent,
    ProductUpdateDialogComponent,
    TruckModelComponent,
    TruckModelCreateDialogComponent,
    TruckModelUpdateDialogComponent,
    TruckComponent,
    TruckCreateDialogComponent,
    TruckUpdateDialogComponent,
    StockComponent,
    StockCreateDialogComponent,
    StockUpdateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    // TableVirtualScrollModule,
  ],
  providers: [
    UserService,
    ProductService,
    TruckModelService,
    TruckService,
    StockService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
