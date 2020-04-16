import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductCreateDialogComponent } from './actions/product-create-dialog.component';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { MatPaginator } from '@angular/material/paginator';
import { AbstractPageComponent } from '../../../lib/classes/PageComponent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductUpdateDialogComponent } from './actions/product-update-dialog.component';
import { ProductService } from '../../../lib/services/product.service';
import { Product } from '../../../lib/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent extends AbstractPageComponent<Product>
  implements OnInit {
  private static readonly DEF_QUERY_BUILDER = RequestQueryBuilder.create()
    .setPage(AbstractPageComponent.DEFAULT_PAGE)
    .setLimit(AbstractPageComponent.DEFAULT_LIMIT);

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public loading: boolean;
  public columnList: string[] = [
    'id',
    'name',
    'cost',
    'actions'
  ];

  constructor(
    productService: ProductService,
    private dialog: MatDialog,
    private snackBarService: MatSnackBar,
  ) {
    super(productService, ProductComponent.DEF_QUERY_BUILDER);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {}

  public create(): void {
    const dialogRef = this.dialog.open(ProductCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) this.loadData();
    });
  }

  public update(entity: Product): void {
    const dialogRef = this.dialog.open(ProductUpdateDialogComponent, {
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
