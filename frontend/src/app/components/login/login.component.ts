import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../lib/constants';
import { getMessageFromError } from '../../../lib/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public async ngOnInit(): Promise<void> {
    // if (this.userService.user) await this.router.navigate(['/']);
  }

  public async logIn(): Promise<void> {
    this.loading = true;
    const { login, password } = this.loginForm.value;
    const user = await this.userService.logIn(login, password);

    if (user) await this.router.navigate(['/']);
    else {
      this.snackBar.open('Неверный логин или пароль', null, {
        duration: SNACK_BAR_DURATION,
      });
      this.loginForm.reset();
    }
    this.loading = false;
  }
}
