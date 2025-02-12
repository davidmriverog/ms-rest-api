import 'reflect-metadata';

import { BaseEntity } from '../../../../core/infrastructure/persistence';

export const IDENTITY_META_KEY = 'IDENTITY_META_KEY';

export const Identity = () => {
  return (target: BaseEntity, key: string) => {
    Reflect.defineMetadata(
      IDENTITY_META_KEY,
      key,
      target.constructor,
      IDENTITY_META_KEY,
    );
  };
};
