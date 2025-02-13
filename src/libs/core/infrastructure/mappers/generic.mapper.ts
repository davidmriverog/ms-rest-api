import { TRowSelect } from '@bomb/core/infrastructure/persistence';

export interface IGenericMapper<D, B, E, R> {
  dtoToBo(attrs: D): B;
  boToEntity(attrs: B): E;
  boToResponse(attrs: B): R;
  entityToBo(attrs: E): B;
  rawToEntity(attrs: TRowSelect): E;
}