import 'reflect-metadata';

export const TABLE_NAME = 'TABLE_NAME';

export function Entity(val: { name: string }) {
  return function (constructor: any) {
    Reflect.defineMetadata(TABLE_NAME, val.name, constructor, TABLE_NAME);
  };
}
