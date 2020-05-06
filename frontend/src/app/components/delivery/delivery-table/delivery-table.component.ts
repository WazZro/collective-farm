import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractTableCdkComponent } from '../../../../lib/classes/abstract-table-cdk-component';
import { Delivery } from '../../../../models/delivery.model';
import { DeliveryService } from '../../../../services/delivery.service';
import { MatPaginator } from '@angular/material/paginator';
import {
  DELIVERY_STATUS_MAP,
  DELIVERY_TYPE_MAP,
} from '../../../../lib/constants';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getMessageFromError } from '../../../../lib/utils';
import { DeliveryUpdateDialogComponent } from '../actions/delivery-update-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryStatusDialogComponent } from './delivery-status-modal.component';

@Component({
  selector: 'app-delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss'],
})
export class DeliveryTableComponent extends AbstractTableCdkComponent<Delivery>
  implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  loading: boolean;
  columnList: string[] = [
    'actions',
    'id',
    'type',
    'status',
    'product',
    'stock',
    'volume',
    'truck',
    'driver',
  ];
  statusList = DELIVERY_STATUS_MAP;
  typeList = DELIVERY_TYPE_MAP;

  @Input()
  canChangeStatus = false;

  @Input()
  private request: RequestQueryBuilder;

  constructor(
    deliveryService: DeliveryService,
    private snackBarService: MatSnackBar,
    private dialogService: MatDialog,
  ) {
    super(deliveryService);
  }

  public ngOnInit(): void {
    this.dataSource.setRequestBuilder(this.request);
    this.loadData();
  }

  public setLoading(enable: boolean): void {
    this.loading = enable;
  }

  public errorCatcher(e): void {
    this.snackBarService.open(getMessageFromError(e), null, { duration: 3000 });
  }

  public update(entity: Delivery): void {
    const dialogRef = this.dialogService.open(DeliveryUpdateDialogComponent, {
      width: '400px',
      data: entity,
    });

    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser) this.loadData();
    });
  }

  public async delete(entity: Delivery): Promise<void> {
    try {
      await this.service.delete(entity.id);
      this.loadData();
    } catch (e) {
      this.errorCatcher(e);
    }
  }

  public changeStatus(entity: Delivery): void {
    const dialogRef = this.dialogService.open(DeliveryStatusDialogComponent, {
      width: '400px',
      data: entity,
    });

    dialogRef.afterClosed().subscribe((delivery) => {
      if (delivery) this.loadData();
    });
  }
}
