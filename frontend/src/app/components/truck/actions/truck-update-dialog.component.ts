/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AbstractUpdateComponent } from '../../../../lib/classes/AbstractUpdateComponent';
import { TruckModel } from '../../../../lib/models/truck-model.model';
import { Truck } from '../../../../lib/models/truck.model';
import { User } from '../../../../lib/models/user.model';
import { TruckModelService } from '../../../../lib/services/truck-model.service';
import { TruckService } from '../../../../lib/services/truck.service';
import { UserService } from '../../../../lib/services/user.service';
import {
  getDifferenceBetweenObjects,
  getEntityStreamNew,
} from '../../../../lib/utils';

@Component({
  selector: 'app-truck-update-dialog',
  templateUrl: 'truck-update-dialog.html',
})
export class TruckUpdateDialogComponent extends AbstractUpdateComponent<Truck>
  implements OnInit {
  public updateForm: FormGroup = new FormGroup({
    id: new FormControl(this.entity.id, [Validators.required]),
    registrationNumber: new FormControl(this.entity.registrationNumber, [
      Validators.required,
    ]),
    model: new FormControl(this.entity.model, [Validators.required]),
    drivers: new FormControl(this.entity.drivers, [Validators.required]),
  });
  public modelStream: Observable<TruckModel[]>;
  public userStream: Observable<User[]>;

  constructor(
    service: TruckService,
    dialogRef: MatDialogRef<TruckUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) entity: Truck,
    private truckModelService: TruckModelService,
    private userService: UserService,
  ) {
    super(entity, service, dialogRef);
  }

  public ngOnInit(): void {
    this.modelStream = getEntityStreamNew({
      service: this.truckModelService,
      formControlStream: this.updateForm.get('model').valueChanges,
      filterFn: input => ({
        $or: [{ model: { $cont: input } }, { brand: { $cont: input } }],
      }),
      initialValue: this.truckModelService.get() as any,
    });

    this.userStream = getEntityStreamNew({
      service: this.userService,
      formControlStream: this.updateForm.get('drivers').valueChanges,
      filterFn: input => ({
        $or: [{ firstName: { $cont: input } }, { lastName: { $cont: input } }],
      }),
      initialValue: this.userService.get() as any,
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
