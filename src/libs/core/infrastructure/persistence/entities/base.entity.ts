import { TABLE_NAME } from '../../../infrastructure/persistence/decorators/entity.decorator';

export class BaseEntity {
  public static getTableName() {
    const key: string = Reflect.getMetadata(TABLE_NAME, this, TABLE_NAME);

    return key;
  }
}
