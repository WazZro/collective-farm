/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractUpdateComponent } from '../../../../lib/classes/AbstractUpdateComponent';
import { TruckModel } from '../../../../lib/models/truck-model.model';
import { TruckModelService } from '../../../../lib/services/truck-model.service';
import { getDifferenceBetweenObjects } from '../../../../lib/utils';

@Component({
  selector: 'app-truck-model-update-dialog',
  templateUrl: 'truck-model-update-dialog.html',
})
export class TruckModelUpdateDialogComponent extends AbstractUpdateComponent<
  TruckModel
> {
  public updateForm: FormGroup = new FormGroup({
    id: new FormControl(this.entity.id, [Validators.required]),
    brand: new FormControl(this.entity.brand, [Validators.required]),
    model: new FormControl(this.entity.model, [Validators.required]),
    capacity: new FormControl(this.entity.capacity, [
      Validators.required,
      Validators.min(0),
    ]),
    buildYear: new FormControl(this.entity.buildYear, [Validators.required]),
  });

  constructor(
    service: TruckModelService,
    dialogRef: MatDialogRef<TruckModelUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) entity: TruckModel,
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
