export interface GetOneEntityInterface<T> {
  apiVersion: number;
  entityName: string;
  entityId: number | string;
  query?: string;
  transform?: {
    type: new () => T;
  };
}
