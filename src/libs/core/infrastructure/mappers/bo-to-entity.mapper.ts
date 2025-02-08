export interface IBoToEntityMapper<B, R> {
  map(bo: B): R;
}
