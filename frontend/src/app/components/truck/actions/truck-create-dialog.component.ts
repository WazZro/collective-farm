/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AbstractCreateComponent } from '../../../../lib/classes/AbstractCreateComponent';
import { TruckModel } from '../../../../lib/models/truck-model.model';
import { Truck } from '../../../../lib/models/truck.model';
import { User } from '../../../../lib/models/user.model';
import { TruckModelService } from '../../../../lib/services/truck-model.service';
import { TruckService } from '../../../../lib/services/truck.service';
import { getEntityStreamNew } from '../../../../lib/utils';
import { UserService } from '../../../../lib/services/user.service';

@Component({
  selector: 'app-truck-create-dialog',
  templateUrl: 'truck-create-dialog.html',
})
export class TruckCreateDialogComponent extends AbstractCreateComponent<Truck>
  implements OnInit {
  public createForm: FormGroup = new FormGroup({
    registrationNumber: new FormControl(undefined, [Validators.required]),
    model: new FormControl(undefined, [Validators.required]),
    drivers: new FormControl(undefined),
  });
  public modelStream: Observable<TruckModel[]>;
  public userStream: Observable<User[]>;

  constructor(
    service: TruckService,
    dialogRef: MatDialogRef<TruckCreateDialogComponent>,
    private truckModelService: TruckModelService,
    private userService: UserService,
  ) {
    super(service, dialogRef);
  }

  public ngOnInit(): void {
    this.modelStream = getEntityStreamNew({
      service: this.truckModelService,
      formControlStream: this.createForm.get('model').valueChanges,
      filterFn: input => ({
        $or: [{ model: { $cont: input } }, { brand: { $cont: input } }],
      }),
      initialValue: this.truckModelService.get() as any,
    });

    this.userStream = getEntityStreamNew({
      service: this.userService,
      formControlStream: this.createForm.get('drivers').valueChanges,
      filterFn: input => ({
        $or: [{ firstName: { $cont: input } }, { lastName: { $cont: input } }],
      }),
      initialValue: this.userService.get() as any,
    });
  }

  public async create(): Promise<void> {
    const newEntity = this.createForm.value;
    const created = await this.service.create(newEntity);
    this.modalClose(created);
  }
}
