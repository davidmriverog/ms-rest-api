export interface IDtoToBoMapper<E, B> {
  map(entity: E): B;
}