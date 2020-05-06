/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AbstractUpdateComponent } from '../../../../lib/classes/abstract-update-component';
import { Stock } from '../../../../models/stock.model';
import { TruckModel } from '../../../../models/truck-model.model';
import { User } from '../../../../models/user.model';
import { StockService } from '../../../../services/stock.service';
import {
  getDifferenceBetweenObjects,
  getEntityStreamNew,
} from '../../../../lib/utils';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-stock-update-dialog',
  templateUrl: 'stock-update-dialog.html',
})
export class StockUpdateDialogComponent extends AbstractUpdateComponent<Stock>
  implements OnInit {
  public updateForm: FormGroup = new FormGroup({
    id: new FormControl(this.entity.id, [Validators.required]),
    product: new FormControl(this.entity.product, [Validators.required]),
    capacity: new FormControl(this.entity.capacity, [
      Validators.required,
      Validators.min(0),
    ]),
    congestion: new FormControl(this.entity.congestion, [Validators.min(0)]),
  });
  public productStream: Observable<Product[]>;

  constructor(
    service: StockService,
    dialogRef: MatDialogRef<StockUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) entity: Stock,
    private productService: ProductService,
  ) {
    super(entity, service, dialogRef);
  }

  public ngOnInit(): void {
    this.productStream = getEntityStreamNew({
      service: this.productService,
      formControlStream: this.updateForm.get('product').valueChanges,
      filterFn: input => ({ name: { $cont: input } }),
      initialValue: this.productService.get() as any,
    });
  }

  public async update(): Promise<void> {
    const toUpdate: any = getDifferenceBetweenObjects(
      this.updateForm.value,
      this.entity,
    );
    console.log(toUpdate);
    const updated = await this.service.update(this.entity.id, toUpdate);
    this.modalClose(updated);
  }
}
