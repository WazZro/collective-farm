import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { AbstractPageComponent } from '../../../lib/classes/page-component';
import { User, UserRoles } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UserCreateDialogComponent } from './actions/user-create-dialog.component';
import { UserUpdateDialogComponent } from './actions/user-update-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends AbstractPageComponent<User>
  implements OnInit {
  private static readonly DEF_QUERY_BUILDER = RequestQueryBuilder.create()
    .setPage(AbstractPageComponent.DEFAULT_PAGE)
    .setLimit(AbstractPageComponent.DEFAULT_LIMIT);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  loading: boolean;
  columnList: string[] = [
    'actions',
    'id',
    'firstName',
    'lastName',
    'phone',
    'role',
  ];

  readonly roleList = new Map<string, string>([
    [UserRoles.DRIVER, 'Водитель'],
    [UserRoles.MANAGER, 'Менеджер'],
    [UserRoles.ADMIN, 'Администратор'],
    [UserRoles.ACCOUNTANT, 'Бухгалтер'],
  ]);

  constructor(
    userService: UserService,
    private dialog: MatDialog,
    private snackBarService: MatSnackBar,
  ) {
    super(userService, UserComponent.DEF_QUERY_BUILDER);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {}

  public create(): void {
    const dialogRef = this.dialog.open(UserCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser) this.loadData();
    });
  }

  public update(user: User): void {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((newUser) => {
      if (newUser) this.loadData();
    });
  }

  public setLoading(enable: boolean): void {
    this.loading = enable;
  }

  public errorCatcher(e): void {
    this.snackBarService.open(e.message, null, { duration: 3000 });
  }

  public openCreateUserDialog(): void {}
}
