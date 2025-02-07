import { RestLogger } from '@bomb/logger';
import { IBasePort } from '../../domain/ports/base.port';
import { IEntityToBoMapper } from '../mappers/entity-to-bo.mapper';
import { IRepository } from '../../infrastructure/persistence';

export abstract class BaseAdapter<I, E> implements IBasePort<I> {
  private readonly _repository: IRepository<E>;

  private readonly _mapEntityToBo: IEntityToBoMapper<E, I>;

  private readonly _logger: RestLogger;

  constructor(repository: IRepository<E>, mapEntityToBo: IEntityToBoMapper<E, I>, logger: RestLogger) {
    this._repository = repository;
    this._mapEntityToBo = mapEntityToBo;
    this._logger = logger;
  }

  async all(): Promise<I[]> {
    try {
      const result: E[] = await this._repository.all();

      return result.map((item) => this._mapEntityToBo.map(item));
    } catch (e) {
      this._logger.log(`returned error: ${e.message}`);

      throw e;
    }
  }

  async findById(id: number): Promise<I> {
    try {
      const result = await this._repository.findById(id);

      return this._mapEntityToBo.map(result);
    } catch (e) {
      this._logger.log(`returned error: ${e.message}`);

      throw e;
    }
  }
}