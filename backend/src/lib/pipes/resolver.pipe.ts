/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ValidationPipe,
  ArgumentMetadata,
  BadRequestException,
  Optional,
  ValidationPipeOptions,
} from '@nestjs/common';
import { getRepository } from 'typeorm';
import 'reflect-metadata';
import { RESOLVER_KEY } from '../decorators/resolver.decorator';

export class EntityResolver extends ValidationPipe {
  constructor(@Optional() options?: ValidationPipeOptions) {
    if (!options) options = {};

    super(
      Object.assign(options, {
        transform: true,
        validateCustomDecorators: true,
      }),
    );
  }

  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type !== 'body' && metadata.type !== 'custom') return value;
    if (typeof value !== 'object') return value;
    const newMetadata = {
      metatype: metadata.metatype,
      data: metadata.data,
      type: metadata.type,
    };

    const validatedData = await super.transform(value, newMetadata);
    console.log(validatedData);
    const resolvers: Map<string, any> = Reflect.getMetadata(
      RESOLVER_KEY,
      validatedData,
    );

    if (!resolvers || !resolvers.size) return validatedData;

    const promises = [];
    for (const key of resolvers.keys()) {
      const entityType = resolvers.get(key);
      if (validatedData[key])
        promises.push(this.loadAndMapEntity(validatedData, key, entityType));
    }

    await Promise.all(promises);
    return validatedData;
  }

  private async loadAndMapEntity(
    value: any,
    key: string,
    entityClass: any,
  ): Promise<void> {
    const entity = await this.loadEntity(entityClass, value[key]);
    EntityResolver.mapEntity(value, key, entity);
  }

  private async loadEntity(
    entityClass: (new () => any) | string,
    nestedObject: any,
  ): Promise<any> {
    const isArray = Array.isArray(nestedObject);

    let entity;
    if (!isArray)
      entity = await getRepository(entityClass).findOne(
        EntityResolver.getIdFromPlain(nestedObject),
      );
    else
      entity = await getRepository(entityClass).findByIds(
        nestedObject.map((value: any) => EntityResolver.getIdFromPlain(value)),
      );
    if ((!isArray && !entity) || (isArray && !entity.length))
      throw new BadRequestException('One or several relations do not exist');

    return entity;
  }

  private static getIdFromPlain(nestedObject: any): number | string {
    let id;
    if (typeof nestedObject === 'object') id = nestedObject.id;
    else if (
      typeof nestedObject === 'number' ||
      typeof nestedObject === 'string'
    )
      id = nestedObject;

    return id;
  }

  private static mapEntity(value: any, key: string, entity: any): void {
    value[key] = entity;
  }
}
