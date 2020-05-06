import { Paginable } from '../interfaces/paginable.interface';
import { ApiRequestService } from '../../services/api.service';

export abstract class AbstractEntityService<T> {
  protected apiService: ApiRequestService;
  protected entityName: string;
  protected apiVersion: number;
  private readonly transform: { type: new () => T };

  protected constructor(
    apiService: ApiRequestService,
    entityName: string,
    apiVersion: number,
    transformType?: new () => T,
  ) {
    this.apiService = apiService;
    this.entityName = entityName;
    this.apiVersion = apiVersion;
    if (transformType) this.transform = { type: transformType };
  }

  public get(query?: string): Promise<T[] | Paginable<T>> {
    if (query && query.includes('page'))
      return this.apiService.getManyInPages<T>({
        apiVersion: this.apiVersion,
        entityName: this.entityName,
        transform: this.transform,
        query,
      });
    return this.apiService.getMany<T>({
      apiVersion: this.apiVersion,
      entityName: this.entityName,
      transform: this.transform,
      query,
    });
  }

  public getOne(entityId: number | string, query?: string): Promise<T> {
    return this.apiService.getOne<T>({
      apiVersion: this.apiVersion,
      entityName: this.entityName,
      entityId,
      transform: this.transform,
      query,
    });
  }

  public create(entity: T): Promise<T> {
    return this.apiService.createOne<T>({
      apiVersion: this.apiVersion,
      entityName: this.entityName,
      transform: this.transform,
      body: entity,
    });
  }

  public update(entityId: string | number, entity: T): Promise<T> {
    return this.apiService.updateOne<T>({
      apiVersion: this.apiVersion,
      entityName: this.entityName,
      entityId,
      transform: this.transform,
      body: entity,
    });
  }

  public delete(entityId: string | number): Promise<T> {
    return this.apiService.delete<T>({
      apiVersion: this.apiVersion,
      entityName: this.entityName,
      entityId,
    });
  }d
}
