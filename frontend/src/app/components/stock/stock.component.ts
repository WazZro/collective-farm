import { Component, OnInit } from '@angular/core';
import { AbstractPageComponent } from '../../../lib/classes/page-component';
import { Stock } from '../../../models/stock.model';
import { StockService } from '../../../services/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { StockCreateDialogComponent } from './actions/stock-create-dialog.component';
import { StockUpdateDialogComponent } from './actions/stock-update-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent extends AbstractPageComponent<Stock>
  implements OnInit {
  private static readonly DEF_QUERY_BUILDER = RequestQueryBuilder.create()
    .setPage(AbstractPageComponent.DEFAULT_PAGE)
    .setLimit(AbstractPageComponent.DEFAULT_LIMIT);

  // @ViewChild(MatPaginator)
  // public paginator: MatPaginator;
  public loading: boolean;

  public constructor(
    service: StockService,
    private dialog: MatDialog,
    private snackBarService: MatSnackBar,
  ) {
    super(service, StockComponent.DEF_QUERY_BUILDER);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public create(): void {
    const dialogRef = this.dialog.open(StockCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newStock => {
      if (newStock) this.loadData();
    });
  }

  public update(entity: Stock): void {
    const dialogRef = this.dialog.open(StockUpdateDialogComponent, {
      width: '400px',
      data: entity,
    });

    dialogRef.afterClosed().subscribe(newStock => {
      if (newStock) this.loadData();
    });
  }

  public setLoading(enable: boolean): void {
    this.loading = enable;
  }

  public errorCatcher(e): void {
    this.snackBarService.open(e.message, null, { duration: 3000 });
  }
}
