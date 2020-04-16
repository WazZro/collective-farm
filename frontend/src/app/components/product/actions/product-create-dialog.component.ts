/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractCreateComponent } from '../../../../lib/classes/AbstractCreateComponent';
import { Product } from '../../../../lib/models/product.model';
import { ProductService } from '../../../../lib/services/product.service';

@Component({
  selector: 'app-product-create-dialog',
  templateUrl: 'product-create-dialog.html',
})
export class ProductCreateDialogComponent extends AbstractCreateComponent<
  Product
> {
  createForm: FormGroup = new FormGroup({
    name: new FormControl(undefined, [Validators.required]),
    cost: new FormControl(undefined, [Validators.required]),
  });

  constructor(
    service: ProductService,
    dialogRef: MatDialogRef<ProductCreateDialogComponent>,
  ) {
    super(service, dialogRef);
  }

  public async create(): Promise<void> {
    const newEntity = this.createForm.value;
    const created = await this.service.create(newEntity);
    this.modalClose(created);
  }
}
