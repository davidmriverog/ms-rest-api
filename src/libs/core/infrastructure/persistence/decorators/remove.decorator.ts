import 'reflect-metadata';

import { BaseEntity } from '../../../../core/infrastructure/persistence';

export const REMOVE_COL_META_KEY = 'REMOVE_COL_META_KEY';

export const RemoveColumn = () => {
  return (target: BaseEntity, key: string) => {
    Reflect.defineMetadata(
      REMOVE_COL_META_KEY,
      key,
      target.constructor,
      REMOVE_COL_META_KEY,
    );
  };
};
