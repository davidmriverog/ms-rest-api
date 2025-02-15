import 'reflect-metadata';

import { BaseEntity } from '../../../../core/infrastructure/persistence';

export const CREATE_COL_META_KEY = 'CREATE_COL_META_KEY';

export const CreateColumn = () => {
  return (target: BaseEntity, key: string) => {
    Reflect.defineMetadata(
      CREATE_COL_META_KEY,
      key,
      target.constructor,
      CREATE_COL_META_KEY,
    );
  };
};
