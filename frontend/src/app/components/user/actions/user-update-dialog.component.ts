/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractUpdateComponent } from '../../../../lib/classes/abstract-update-component';
import { User, UserRoles } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { getDifferenceBetweenObjects, getMessageFromError } from '../../../../lib/utils';

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
    role: new FormControl(this.entity.role, [Validators.required]),
  });

  public readonly roleList = new Map<string, string>([
    [UserRoles.DRIVER, 'Водитель'],
    [UserRoles.MANAGER, 'Менеджер'],
    [UserRoles.ADMIN, 'Администратор'],
    [UserRoles.ACCOUNTANT, 'Бухгалтер'],
  ]);

  constructor(
    userService: UserService,
    dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) user: User,
    private snackBar: MatSnackBar,
  ) {
    super(user, userService, dialogRef);
  }

  public async update(): Promise<void> {
    const toUpdate: any = getDifferenceBetweenObjects(
      this.userUpdateForm.value,
      this.entity,
    );
    console.log(toUpdate);

    try {
      const updated = await this.service.update(this.entity.id, toUpdate);
      this.modalClose(updated);
    } catch (e) {
      const message = getMessageFromError(e);
      this.snackBar.open(message, null, { duration: 3000 });
    }
  }
}
