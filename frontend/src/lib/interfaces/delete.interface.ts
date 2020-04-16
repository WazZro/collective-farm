export interface DeleteEntityInterface<T> {
  apiVersion: number;
  entityName: string;
  entityId: number | string;
  query?: string;
}
