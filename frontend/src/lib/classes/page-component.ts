import { AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Paginable } from '../interfaces/paginable.interface';
import { AbstractEntityService } from './abstract-entity-service';

export abstract class AbstractPageComponent<T>
  implements AfterViewInit, OnDestroy {
  static readonly DEFAULT_PAGE = 1;
  static readonly DEFAULT_LIMIT = 5;

  filters = new Map<string, any>();
  orderBy = { field: 'id', order: 'ASC' };
  data: T[];

  currentPage = AbstractPageComponent.DEFAULT_PAGE;
  currentLimit = AbstractPageComponent.DEFAULT_LIMIT;
  pages: any[];
  pageInfo: Paginable<T> = {
    total: 0,
    count: 0,
    data: [],
    page: 0,
    pageCount: 0,
  };
  pageLimits = [1, 5, 25, 50, 100];

  paginator: MatPaginator;
  pageChangeSubscription: Subscription;

  protected defaultQueryBuilder: RequestQueryBuilder;
  protected query: RequestQueryBuilder;
  protected service: AbstractEntityService<T>;

  protected constructor(
    service: AbstractEntityService<T>,
    defaultQueryBuilder?: RequestQueryBuilder,
  ) {
    this.service = service;
    if (defaultQueryBuilder) {
      this.defaultQueryBuilder = defaultQueryBuilder;
      this.query = cloneDeep(defaultQueryBuilder);
    }
  }

  public ngAfterViewInit(): void {
    this.pageChangeSubscription = this.paginator?.page
      .pipe(
        tap((pageEvent) => {
          console.log(pageEvent);
          this.setPageLimit(pageEvent.pageSize);
          this.setPage(pageEvent.pageIndex + 1);
          this.loadData();
        }),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    // eslint-disable-next-line no-unused-expressions
    this.pageChangeSubscription?.unsubscribe();
  }

  public setRequestBuilder(builder: RequestQueryBuilder): void {
    this.defaultQueryBuilder = builder;
    this.query = cloneDeep(builder);
  }

  /**
   * Method for delete entity
   * @param id - entity id
   */
  public async delete(id: number | string): Promise<void> {
    try {
      this.setLoading(true);
      await this.service.delete(id);
      this.loadData();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Load data from service with filters and orders
   */
  public async loadData(): Promise<void> {
    try {
      this.setLoading(true);
      // this.applyFilters();
      this.data = this.processData(await this.service.get(this.query.query()));
    } catch (e) {
      console.error(e);
      this.errorCatcher(e);
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * If Pagible it is set page
   * @param page - number of page
   */
  public setPage(page: number): void {
    this.query.setPage(page);
    this.currentPage = page;
    // this.loadData();
  }

  /**
   * Set get limit
   * @param limit - number of limit
   */
  public setPageLimit(limit: number): void {
    this.currentLimit = limit;
    this.query.setLimit(limit);
    // this.loadData();
  }

  protected processData(data: any): T[] {
    if (Array.isArray(data)) {
      return data;
    } else {
      this.pageInfo = data;
      this.pageInfo.page--;
      this.currentLimit = this.pageInfo.count;
      this.currentPage = this.pageInfo.page;
      // if (this.pageInfo.pageCount)
      //   this.pages = pagination(this.currentPage, this.pageInfo.pageCount);
      // else this.pages = [1];
      return data.data;
    }
  }

  /**
   * Method for set loading indicator
   * @param enable - boolean
   */
  public abstract setLoading(enable: boolean): void;

  public abstract errorCatcher(e: Error): void | Promise<void>;
}
