export interface IEntityToBoMapper<E, B> {
  map(entity: E): B;
}