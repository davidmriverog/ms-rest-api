export interface IBoToEntityMapper<E, B> {
  map<E>(bo: B): E;
}
