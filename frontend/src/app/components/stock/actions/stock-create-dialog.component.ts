/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AbstractCreateComponent } from '../../../../lib/classes/AbstractCreateComponent';
import { Product } from '../../../../lib/models/product.model';
import { Stock } from '../../../../lib/models/stock.model';
import { ProductService } from '../../../../lib/services/product.service';
import { StockService } from '../../../../lib/services/stock.service';
import { getEntityStreamNew } from '../../../../lib/utils';

@Component({
  selector: 'app-stock-create-dialog',
  templateUrl: 'stock-create-dialog.html',
})
export class StockCreateDialogComponent extends AbstractCreateComponent<Stock>
  implements OnInit {
  public createForm: FormGroup = new FormGroup({
    product: new FormControl(undefined, [Validators.required]),
    capacity: new FormControl(undefined, [
      Validators.required,
      Validators.min(0),
    ]),
    congestion: new FormControl(0),
  });
  public productStream: Observable<Product[]>;

  constructor(
    service: StockService,
    dialogRef: MatDialogRef<StockCreateDialogComponent>,
    private productService: ProductService,
  ) {
    super(service, dialogRef);
  }

  public ngOnInit(): void {
    this.productStream = getEntityStreamNew({
      service: this.productService,
      formControlStream: this.createForm.get('product').valueChanges,
      filterFn: input => ({ name: { $cont: input } }),
      initialValue: this.productService.get() as any,
    });
  }

  public async create(): Promise<void> {
    const newEntity = this.createForm.value;
    const created = await this.service.create(newEntity);
    this.modalClose(created);
  }
}
