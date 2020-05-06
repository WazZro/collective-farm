/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractCreateComponent } from '../../../../lib/classes/abstract-create-component';
import { TruckModel } from '../../../../models/truck-model.model';
import { TruckModelService } from '../../../../services/truck-model.service';

@Component({
  selector: 'app-truck-model-create-dialog',
  templateUrl: 'truck-model-create-dialog.html',
})
export class TruckModelCreateDialogComponent extends AbstractCreateComponent<
  TruckModel
> {
  createForm: FormGroup = new FormGroup({
    brand: new FormControl(undefined, [Validators.required]),
    model: new FormControl(undefined, [Validators.required]),
    capacity: new FormControl(undefined, [
      Validators.required,
      Validators.min(0),
    ]),
    buildYear: new FormControl(undefined, [Validators.required]),
  });

  constructor(
    service: TruckModelService,
    dialogRef: MatDialogRef<TruckModelCreateDialogComponent>,
  ) {
    super(service, dialogRef);
  }

  public async create(): Promise<void> {
    const newEntity = this.createForm.value;
    const created = await this.service.create(newEntity);
    this.modalClose(created);
  }
}
