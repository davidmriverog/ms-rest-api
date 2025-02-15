import { Knex } from 'knex';

export interface IRepository<I> {
  all(): Promise<I[]>;
  findById(id: number): Promise<I>;
  create(attrs: I, transaction?: Knex.Transaction): Promise<I>;
  update(id: number, attrs: I, transaction?: Knex.Transaction): Promise<I>;
  remove(id: number, transaction?: Knex.Transaction): Promise<boolean>;
}
