export interface IRawToEntityMapper<E> {
  map(raw: any): E;
}
