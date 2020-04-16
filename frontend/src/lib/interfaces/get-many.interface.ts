export interface GetManyEntityInterface<T> {
  apiVersion: number;
  entityName: string;
  query?: string;
  transform?: {
    type: new () => T;
  };
}
