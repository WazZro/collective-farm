import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { AbstractPageComponent } from '../../../lib/classes/PageComponent';
import { Truck } from '../../../lib/models/truck.model';
import { TruckService } from '../../../lib/services/truck.service';
import { TruckCreateDialogComponent } from './actions/truck-create-dialog.component';
import { TruckUpdateDialogComponent } from './actions/truck-update-dialog.component';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss'],
})
export class TruckComponent extends AbstractPageComponent<Truck>
  implements OnInit {
  private static readonly DEF_QUERY_BUILDER = RequestQueryBuilder.create()
    .setJoin({ field: 'drivers' })
    .setPage(AbstractPageComponent.DEFAULT_PAGE)
    .setLimit(AbstractPageComponent.DEFAULT_LIMIT);

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public loading: boolean;
  public columnList: string[] = [
    'id',
    'registrationNumber',
    'brand',
    'model',
    'buildYear',
    'capacity',
    'actions',
  ];

  constructor(
    service: TruckService,
    private dialog: MatDialog,
    private snackBarService: MatSnackBar,
  ) {
    super(service, TruckComponent.DEF_QUERY_BUILDER);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {}

  public create(): void {
    const dialogRef = this.dialog.open(TruckCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) this.loadData();
    });
  }

  public update(entity: Truck): void {
    const dialogRef = this.dialog.open(TruckUpdateDialogComponent, {
      width: '400px',
      data: entity,
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) this.loadData();
    });
  }

  public setLoading(enable: boolean): void {
    this.loading = enable;
  }

  public errorCatcher(e): void {
    this.snackBarService.open(e.message, null, { duration: 3000 });
  }

  public openCreateUserDialog(): void {}
}
