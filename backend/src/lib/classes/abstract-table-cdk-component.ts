import { AbstractEntityService } from './abstract-entity-service';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { EntityDataSource } from './abstract-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export abstract class AbstractTableCdkComponent<T>
  implements AfterViewInit, OnDestroy {
  dataSource: EntityDataSource<T> = null;
  paginator: MatPaginator = null;
  pageChangeSubscription: Subscription = null;
  pageResponseSubscription: Subscription = null;
  pageLimits = [1, 5, 25, 50, 100];

  protected constructor(protected service: AbstractEntityService<T>) {
    this.dataSource = new EntityDataSource<T>(service);
  }

  public ngAfterViewInit(): void {
    this.pageResponseSubscription = this.dataSource.pageInfo
      .pipe(
        tap((pageInfo) => {
          this.paginator.length = pageInfo.total;
          this.paginator.pageSize = pageInfo.count;
          this.paginator.pageIndex = pageInfo.page;
        }),
      )
      .subscribe();

    this.pageChangeSubscription = this.paginator?.page
      .pipe(
        tap((pageEvent) => {
          this.dataSource
            .setPage(pageEvent.pageIndex + 1)
            .setPageLimit(pageEvent.pageSize);

          this.loadData();
        }),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.pageResponseSubscription.unsubscribe();
    this.pageChangeSubscription.unsubscribe();
    this.dataSource.disconnect();
  }

  /**
   * Load data from service with filters and orders
   */
  public loadData(): void {
    this.setLoading(true);
    this.dataSource
      .loadData()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe(
        () => {},
        (error) => {
          this.errorCatcher(error);
          this.setLoading(false);
        },
      );
  }

  /**
   * Method for set loading indicator
   * @param enable - boolean
   */
  public abstract setLoading(enable: boolean): void;

  public abstract update(entity: number | string | T): Promise<void> | void;

  public abstract delete(entity: number | string | T): Promise<void> | void;

  public abstract errorCatcher(e: Error): void;
}
