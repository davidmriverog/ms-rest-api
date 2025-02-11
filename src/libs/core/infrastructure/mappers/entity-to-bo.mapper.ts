export interface IEntityToBoMapper<E, B> {
  map(entity: E): B;
  mapBoToEntity(bo: B): E;
}