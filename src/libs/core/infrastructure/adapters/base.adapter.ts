import { RestLogger } from '@bomb/logger';
import { IBasePort } from '../../domain/ports/base.port';
import { IRepository } from '../../infrastructure/persistence';
import { IGenericMapper } from '@bomb/core/infrastructure';

export abstract class BaseAdapter<I, E> implements IBasePort<I> {
  private readonly _repository: IRepository<E>;

  private readonly _mapper: IGenericMapper<any,I, E, any>;

  private readonly _logger: RestLogger;

  constructor(
    repository: IRepository<E>,
    mapper: IGenericMapper<any,I, E, any>,
    logger: RestLogger,
  ) {
    this._repository = repository;
    this._mapper = mapper;
    this._logger = logger;
  }

  async all(): Promise<I[]> {
    try {
      const result: E[] = await this._repository.all();

      return result.map((item) => this._mapper.entityToBo(item));
    } catch (e) {
      throw e;
    }
  }

  async findById(id: number): Promise<I> {
    try {
      const result: E = await this._repository.findById(id);

      return this._mapper.entityToBo(result);
    } catch (e) {
      throw e;
    }
  }

  async create(bo: I): Promise<I> {
    try {
      const entity: E = this._mapper.boToEntity(bo);

      const result: E = await this._repository.create(entity);

      return this._mapper.entityToBo(result);
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, bo: I): Promise<I> {
    try {
      const entity: E = this._mapper.boToEntity(bo);

      const result: E = await this._repository.update(id, entity)

      return this._mapper.entityToBo(result);
    } catch (e) {
      throw e;
    }
  }
}