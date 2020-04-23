import 'reflect-metadata';

export const PRIVATE_META_KEY = 'private-field-meta-key';
export const Private = (params?: PrivateParams) => (
  target: any,
  key: string,
) => {
  const privateFields: PrivateMetadata[] =
    Reflect.getMetadata(PRIVATE_META_KEY, target) || [];

  if (!privateFields.length)
    Reflect.defineMetadata(PRIVATE_META_KEY, privateFields, target);

  privateFields.push({ key, meta: params });
};

export interface PrivateMetadata {
  key: string;
  meta: PrivateParams;
}

interface PrivateParams {
  allowRoles?: string[];
  canSee?: boolean;
}
