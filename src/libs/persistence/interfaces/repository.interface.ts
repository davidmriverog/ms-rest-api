export interface IRepository<I> {
  all(): Promise<I[]>;
  findById(id: number): Promise<I>;
}
