export interface IBasePort<I> {
  all(): Promise<I[]>;
  findById(id: number): Promise<I>;
}