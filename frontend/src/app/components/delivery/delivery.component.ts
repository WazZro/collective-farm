import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Delivery } from '../../../models/delivery.model';
import { DeliveryCreateDialogComponent } from './actions/delivery-create-dialog.component';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { AbstractTableCdkComponent } from '../../../lib/classes/abstract-table-cdk-component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  deliveryRequest = RequestQueryBuilder.create()
    .setJoin({ field: 'driver' })
    .setJoin({ field: 'stock' })
    .setJoin({ field: 'stock.product' })
    .setJoin({ field: 'product' })
    .setJoin({ field: 'truck' })
    .setJoin({ field: 'truck.model' });

  @ViewChild('tableComponent', { static: true })
  tableComponent: AbstractTableCdkComponent<Delivery>;

  constructor(private dialog: MatDialog) {}

  public create(): void {
    const dialogRef = this.dialog.open(DeliveryCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser) this.tableComponent.loadData();
    });
  }
}
