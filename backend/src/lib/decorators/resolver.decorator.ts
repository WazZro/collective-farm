import 'reflect-metadata';
import { BaseEntity } from 'typeorm';

export const RESOLVER_KEY = 'cl:resolver-key';

/**
 * Resolve relationships from database
 * @param entityClass Entity class to resolve relation
 */
export const EntityResolver = (
  entityClass: (new () => BaseEntity) | string,
) => (target: unknown, key: string): void => {
  const resolvers: Map<string, (new () => BaseEntity) | string> =
    Reflect.getMetadata(RESOLVER_KEY, target) || new Map();

  if (!resolvers.size) Reflect.defineMetadata(RESOLVER_KEY, resolvers, target);

  resolvers.set(key, entityClass);
};
