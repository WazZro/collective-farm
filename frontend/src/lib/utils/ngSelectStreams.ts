/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { RequestQueryBuilder, SCondition } from '@nestjsx/crud-request';
import { cloneDeep } from 'lodash';
import { concat, from, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { AbstractEntityService } from '../classes/abstract-entity-service';

export function getEntityStreamNew<T>(options: {
  formControlStream: Observable<string>;
  service: AbstractEntityService<T>;
  filterFn: (input: string) => SCondition;
  initialValue?: T[] | Promise<T[]>;
  defaultQueryBuilder?: RequestQueryBuilder;
  defaultSearchCondition?: SCondition;
}): Observable<T[]> {
  return concat(
    from(getInitValuePromise(options.initialValue)),
    options.formControlStream.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(async (input: string) => {
        if (!options.defaultQueryBuilder)
          options.defaultQueryBuilder = RequestQueryBuilder.create();

        const query = cloneDeep(options.defaultQueryBuilder);
        const search = Object.assign({}, options.defaultSearchCondition);

        if (!options.defaultSearchCondition)
          options.defaultSearchCondition = {};

        if (input)
          Object.assign(
            search,
            options.defaultSearchCondition,
            options.filterFn(input),
          );
        query.search(search);

        try {
          return (await options.service.get(query.query())) as T[];
        } catch {
          return [];
        }
      }),
    ),
  );
}

function getInitValuePromise<T = any>(
  initialValue: T[] | Promise<T[]>,
): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    if (!initialValue) resolve([]);
    else if (initialValue instanceof Promise) {
      initialValue.then(result => resolve(result)).catch(err => reject(err));
    } else resolve(initialValue);
  });
}
