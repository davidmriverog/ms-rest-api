import 'reflect-metadata';

import { BaseEntity } from '../../../../core/infrastructure/persistence';

export const UPDATE_COL_META_KEY = 'UPDATE_COL_META_KEY';

export const UpdateColumn = () => {
  return (target: BaseEntity, key: string) => {
    Reflect.defineMetadata(
      UPDATE_COL_META_KEY,
      key,
      target.constructor,
      UPDATE_COL_META_KEY,
    );
  };
};
