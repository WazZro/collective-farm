/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../lib/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../../lib/models/user.model';
import { AbstractUpdateComponent } from '../../../../lib/classes/AbstractUpdateComponent';
import { getDifferenceBetweenObjects } from '../../../../lib/utils';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: 'user-update-dialog.html',
})
export class UserUpdateDialogComponent extends AbstractUpdateComponent<User> {
  public userUpdateForm: FormGroup = new FormGroup({
    id: new FormControl(this.entity.id, [Validators.required]),
    firstName: new FormControl(this.entity.firstName, [Validators.required]),
    lastName: new FormControl(this.entity.lastName, [Validators.required]),
    birthDate: new FormControl(this.entity.birthDate, [Validators.required]),
    startWorkDate: new FormControl(this.entity.startWorkDate),
    phone: new FormControl(this.entity.phone, [Validators.required]),
  });

  constructor(
    userService: UserService,
    dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) user: User,
  ) {
    super(user, userService, dialogRef);
  }

  public async update(): Promise<void> {
    const toUpdate: any = getDifferenceBetweenObjects(
      this.userUpdateForm.value,
      this.entity,
    );
    console.log(toUpdate);
    const updated = await this.service.update(this.entity.id, toUpdate);
    this.modalClose(updated);
  }
}
