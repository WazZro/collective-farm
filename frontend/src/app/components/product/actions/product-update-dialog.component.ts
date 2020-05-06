/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractUpdateComponent } from '../../../../lib/classes/abstract-update-component';
import { getDifferenceBetweenObjects } from '../../../../lib/utils';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-update-dialog',
  templateUrl: 'product-update-dialog.html',
})
export class ProductUpdateDialogComponent extends AbstractUpdateComponent<
  Product
> {
  public updateForm: FormGroup = new FormGroup({
    id: new FormControl(this.entity.id, [Validators.required]),
    name: new FormControl(this.entity.name, [Validators.required]),
    cost: new FormControl(this.entity.cost, [Validators.required]),
  });

  constructor(
    service: ProductService,
    dialogRef: MatDialogRef<ProductUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) entity: Product,
  ) {
    super(entity, service, dialogRef);
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
