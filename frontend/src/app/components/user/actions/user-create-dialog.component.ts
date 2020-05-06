/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserRoles } from '../../../../models/user.model';
import { AbstractCreateComponent } from '../../../../lib/classes/abstract-create-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getMessageFromError } from '../../../../lib/utils';

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: 'user-create-dialog.html',
})
export class UserCreateDialogComponent extends AbstractCreateComponent<User> {
  userCreateForm: FormGroup = new FormGroup({
    firstName: new FormControl(undefined, [Validators.required]),
    lastName: new FormControl(undefined, [Validators.required]),
    birthDate: new FormControl(undefined, [Validators.required]),
    startWorkDate: new FormControl(),
    phone: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required]),
    role: new FormControl(undefined, [Validators.required]),
  });

  readonly roleList = new Map<string, string>([
    [UserRoles.DRIVER, 'Водитель'],
    [UserRoles.MANAGER, 'Менеджер'],
    [UserRoles.ADMIN, 'Администратор'],
    [UserRoles.ACCOUNTANT, 'Бухгалтер'],
  ]);

  constructor(
    userService: UserService,
    dialogRef: MatDialogRef<UserCreateDialogComponent>,
    private snackBar: MatSnackBar,
  ) {
    super(userService, dialogRef);
  }

  public async create(): Promise<void> {
    const user = this.userCreateForm.value;
    try {
      const created = await this.service.create(user);
      this.modalClose(created);
    } catch (e) {
      const message = getMessageFromError(e);
      this.snackBar.open(message, null, { duration: 3000 });
    }
  }
}
