import { Component, ViewChild, OnInit } from '@angular/core';
import { User } from '../../../lib/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateDialogComponent } from './actions/user-create-dialog.component';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { MatPaginator } from '@angular/material/paginator';
import { AbstractPageComponent } from '../../../lib/classes/PageComponent';
import { UserService } from '../../../lib/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  public paginator: MatPaginator;
  public loading: boolean;
  public columnList: string[] = [
    'id',
    'firstName',
    'lastName',
    'phone',
    'actions',
  ];

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

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) this.loadData();
    });
  }

  public update(user: User): void {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(newUser => {
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
