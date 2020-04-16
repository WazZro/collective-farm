/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../lib/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../../lib/models/user.model';
import { AbstractCreateComponent } from '../../../../lib/classes/AbstractCreateComponent';

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
  });

  constructor(
    userService: UserService,
    dialogRef: MatDialogRef<UserCreateDialogComponent>,
  ) {
    super(userService, dialogRef);
  }

  public async create(): Promise<void> {
    const user = this.userCreateForm.value;
    const created = await this.service.create(user);
    this.modalClose(created);
  }
}
