import { DataSource } from '@angular/cdk/collections';
import { AbstractEntityService } from './abstract-entity-service';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { QuerySort, RequestQueryBuilder } from '@nestjsx/crud-request';
import { Paginable } from '../interfaces/paginable.interface';
import { cloneDeep } from 'lodash';
import { map, tap } from 'rxjs/operators';

export class EntityDataSource<T> extends DataSource<T> {
  static readonly DEFAULT_PAGE = 1;
  static readonly DEFAULT_LIMIT = 5;

  protected defaultQueryBuilder: RequestQueryBuilder;
  protected query: RequestQueryBuilder;
  protected readonly service: AbstractEntityService<T>;

  protected filters = new Map<string, any>();
  protected orderBy: QuerySort = { field: 'id', order: 'ASC' };

  private currentPage = EntityDataSource.DEFAULT_PAGE;
  private currentLimit = EntityDataSource.DEFAULT_LIMIT;
  private subject = new BehaviorSubject<T[]>([]);
  private pageSubject = new BehaviorSubject<Paginable<T>>({
    total: 0,
    count: 0,
    data: [],
    page: 0,
    pageCount: 0,
  });

  public get pageInfo(): Observable<Paginable<T>> {
    return this.pageSubject.asObservable();
  }

  constructor(
    service: AbstractEntityService<T>,
    defaultQueryBuilder?: RequestQueryBuilder,
  ) {
    super();
    this.service = service;
    if (defaultQueryBuilder) this.setRequestBuilder(defaultQueryBuilder);
    else this.setRequestBuilder(RequestQueryBuilder.create());
  }

  public connect(): Observable<T[]> {
    return this.subject.asObservable();
  }

  public disconnect(): void {
    this.subject.complete();
    this.pageSubject.complete();
  }

  public setRequestBuilder(builder: RequestQueryBuilder): EntityDataSource<T> {
    this.defaultQueryBuilder = builder;
    this.query = cloneDeep(builder);
    return this.setPage(EntityDataSource.DEFAULT_PAGE).setPageLimit(
      EntityDataSource.DEFAULT_LIMIT,
    );
  }

  /**
   * Load data from service with filters and orders
   */
  public loadData(): Observable<T[]> {
    this.query.sortBy(this.orderBy);
    return from(this.service.get(this.query.query())).pipe(
      map((value) => this.processData(value)),
      tap((value) => console.log(value)),
      tap((value) => this.subject.next(value)),
    );
  }

  public sortBy(field: string, order: 'ASC' | 'DESC'): EntityDataSource<T> {
    this.orderBy.field = field;
    this.orderBy.order = order;
    return this;
  }

  /**
   * If Paginable it is set page
   * @param page - number of page
   */
  public setPage(page: number): EntityDataSource<T> {
    this.query.setPage(page);
    this.currentPage = page;
    return this;
  }

  /**
   * Set get limit
   * @param limit - number of limit
   */
  public setPageLimit(limit: number): EntityDataSource<T> {
    this.currentLimit = limit;
    this.query.setLimit(limit);
    return this;
  }

  protected processData(data: T[] | Paginable<T>): T[] {
    if (Array.isArray(data)) {
      return data;
    } else {
      const pageInfo = data;
      pageInfo.page--;
      this.pageSubject.next(pageInfo);
      return pageInfo.data;
    }
  }
}
