import { TABLE_NAME } from '../../../infrastructure/persistence/decorators/entity.decorator';
import { IDENTITY_META_KEY } from '../../../infrastructure/persistence/decorators/identity.decorator';
import { CREATE_COL_META_KEY, REMOVE_COL_META_KEY, UPDATE_COL_META_KEY } from '@bomb/core/infrastructure/persistence';

export class BaseEntity {
  public static getTableName() {
    const key: string = Reflect.getMetadata(TABLE_NAME, this, TABLE_NAME);

    return key;
  }

  public static getIdentity() {
    const key = Reflect.getMetadata(IDENTITY_META_KEY, this, IDENTITY_META_KEY);

    return key;
  }

  public static getCreatedAtColumn() {
    const key = Reflect.getMetadata(CREATE_COL_META_KEY, this, CREATE_COL_META_KEY);

    return key;
  }

  public static getUpdateAtColumn() {
    const key = Reflect.getMetadata(UPDATE_COL_META_KEY, this, UPDATE_COL_META_KEY);

    return key;
  }

  public static getRemoveAtColumn() {
    const key = Reflect.getMetadata(REMOVE_COL_META_KEY, this, REMOVE_COL_META_KEY);

    return key;
  }
}
