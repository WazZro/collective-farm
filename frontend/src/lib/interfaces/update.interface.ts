export interface UpdateEntityInterface<T> {
  apiVersion: number;
  entityName: string;
  entityId: number | string;
  body: T;
  query?: string;
  transform?: {
    type: new () => T;
  };
}
