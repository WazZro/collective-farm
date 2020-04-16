export interface CreateEntityInterface<T> {
  apiVersion: number;
  entityName: string;
  body: T;
  query?: string;
  transform?: {
    type: new () => T;
  };
}
