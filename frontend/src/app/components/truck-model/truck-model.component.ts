import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { AbstractPageComponent } from '../../../lib/classes/page-component';
import { TruckModel } from '../../../models/truck-model.model';
import { TruckModelService } from '../../../services/truck-model.service';
import { TruckModelCreateDialogComponent } from './actions/truck-model-create-dialog.component';
import { TruckModelUpdateDialogComponent } from './actions/truck-model-update-dialog.component';

@Component({
  selector: 'app-truck-model',
  templateUrl: './truck-model.component.html',
  styleUrls: ['./truck-model.component.scss'],
})
export class TruckModelComponent extends AbstractPageComponent<TruckModel>
  implements OnInit {
  private static readonly DEF_QUERY_BUILDER = RequestQueryBuilder.create()
    .setPage(AbstractPageComponent.DEFAULT_PAGE)
    .setLimit(AbstractPageComponent.DEFAULT_LIMIT);

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public loading: boolean;
  public columnList: string[] = [
    'id',
    'brand',
    'model',
    'buildYear',
    'capacity',
    'actions',
  ];

  constructor(
    service: TruckModelService,
    private dialog: MatDialog,
    private snackBarService: MatSnackBar,
  ) {
    super(service, TruckModelComponent.DEF_QUERY_BUILDER);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {}

  public create(): void {
    const dialogRef = this.dialog.open(TruckModelCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) this.loadData();
    });
  }

  public update(entity: TruckModel): void {
    const dialogRef = this.dialog.open(TruckModelUpdateDialogComponent, {
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
