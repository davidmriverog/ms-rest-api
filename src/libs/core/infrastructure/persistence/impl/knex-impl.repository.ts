import { Knex } from 'knex';
import { RestLogger } from '@bomb/logger';
import { IRawToEntityMapper } from '@bomb/core/infrastructure';

import { IRepository } from '../../../infrastructure/persistence';
import { BaseEntity } from '../../../infrastructure/persistence/entities/base.entity';

export abstract class KnexRepositoryImpl<I> implements IRepository<I> {
  _dataSource: Knex;
  _baseEntity: typeof BaseEntity;
  _mapper: IRawToEntityMapper<I>;
  _logger: RestLogger;

  constructor(dataSource: Knex, mapper: IRawToEntityMapper<I>, logger: RestLogger, baseEntity: typeof BaseEntity) {
    this._dataSource = dataSource;
    this._mapper = mapper;
    this._logger = logger;
    this._baseEntity = baseEntity;
  }

  async all(): Promise<I[]> {
    try {
      const findList: any[] = await this._dataSource.select('*').from(this._baseEntity.getTableName());

      return findList.map((it) => this._mapper.map(it));
    } catch (e) {
      this._logger.log(e.message);
      throw e;
    }
  }

  async findById(id: number): Promise<I> {
    try {
      const findFirst: any = await this._dataSource
        .select('*')
        .from(this._baseEntity.getTableName())
        .where('id', id)
        .first();

      if (!findFirst) throw new Error('No record found');

      return this._mapper.map(findFirst);
    } catch (e) {
      this._logger.log(e.message);
      throw e;
    }
  }
}
