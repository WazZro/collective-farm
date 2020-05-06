import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;

  public get user(): User {
    return this.userService.user;
  }

  constructor(private userService: UserService, private router: Router) {}

  public async logOut(): Promise<void> {
    if (!this.user) return;
    try {
      await this.userService.logOut();
      await this.router.navigate(['/login']);
    } catch (e) {
      console.error(e);
    }
  }
}
