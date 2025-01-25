export interface IRepository<I> {
  all(): Promise<I[]>;
}
