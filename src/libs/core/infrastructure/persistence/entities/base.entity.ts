import { TABLE_NAME } from '../../../infrastructure/persistence/decorators/entity.decorator';
import { IDENTITY_META_KEY } from '../../../infrastructure/persistence/decorators/identity.decorator';
import { UPDATE_COL_META_KEY } from '@bomb/core/infrastructure/persistence';

export class BaseEntity {
  public static getTableName() {
    const key: string = Reflect.getMetadata(TABLE_NAME, this, TABLE_NAME);

    return key;
  }

  public static getIdentity() {
    const key = Reflect.getMetadata(IDENTITY_META_KEY, this, IDENTITY_META_KEY);

    return key;
  }

  public static getUpdateAtColumn() {
    const key = Reflect.getMetadata(UPDATE_COL_META_KEY, this, UPDATE_COL_META_KEY);

    return key;
  }
}
