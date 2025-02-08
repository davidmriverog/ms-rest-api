export interface IBoToResponseMapper<B, R> {
  map(bo: B): R;
}
