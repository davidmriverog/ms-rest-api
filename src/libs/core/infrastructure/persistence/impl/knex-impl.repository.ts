import { Knex } from 'knex';
import { RestLogger } from '@bomb/logger';
import { BaseError } from '@bomb/core/domain';
import { BaseEntity, IRepository, TRowSelect } from '@bomb/core/infrastructure/persistence';
import { IGenericMapper } from '@bomb/core/infrastructure';

export abstract class KnexRepositoryImpl<I> implements IRepository<I> {
  _dataSource: Knex;
  _baseEntity: typeof BaseEntity;
  _baseError: typeof BaseError;
  _mapper: IGenericMapper<any, any, I, any>;
  _logger: RestLogger;

  protected constructor(
    dataSource: Knex,
    mapper: IGenericMapper<any, any, I, any>,
    logger: RestLogger,
    baseEntity: typeof BaseEntity,
    baseError: typeof BaseError,
  ) {
    this._dataSource = dataSource;
    this._mapper = mapper;
    this._logger = logger;
    this._baseEntity = baseEntity;
    this._baseError = baseError;
  }

  async all(): Promise<I[]> {
    try {
      const findList: TRowSelect[] = await this._dataSource
        .select('*')
        .from(this._baseEntity.getTableName());

      return findList.map((it) => this._mapper.rawToEntity(it));
    } catch (e) {
      this._logger.log(e.message);
      throw new this._baseError(
        `${this._baseEntity.getTableName()}.all.query_errors`,
      );
    }
  }

  async findById(id: number): Promise<I> {
    try {
      const findFirst: TRowSelect = await this._dataSource
        .select('*')
        .from(this._baseEntity.getTableName())
        .where('id', id)
        .first();

      if (!findFirst)
        throw new this._baseError(
          `${this._baseEntity.getTableName()}.findById.not_record`,
        );

      return this._mapper.rawToEntity(findFirst);
    } catch (e) {
      this._logger.log(JSON.stringify(e));
      throw e;
    }
  }

  async create(attrs: I, transaction?: Knex.Transaction): Promise<I> {
    const trx = transaction ?? (await this._dataSource.transaction());

    try {
      const result = await this._dataSource
        .insert(attrs)
        .into(this._baseEntity.getTableName())
        .transacting(trx)
        .returning('*');

      if (!transaction) await trx.commit();

      return this._mapper.rawToEntity(result[0]);
    } catch (e) {
      this._logger.log(e.message);

      if (!transaction) await trx.rollback();

      throw new this._baseError(
        `${this._baseEntity.getTableName()}.create.sql_errors`,
      );
    }
  }

  async update(id: number, attrs: I, transaction?: Knex.Transaction): Promise<I> {
    const trx = transaction ?? (await this._dataSource.transaction());

    try {
      const table = this._baseEntity.getTableName();

      const result = await this._dataSource(table)
        .transacting(trx)
        .where(this._baseEntity.getIdentity(), id)
        .update(attrs)
        .returning('*');

      if (!transaction) await trx.commit();

      return this._mapper.rawToEntity(result[0]);
    } catch (e) {
      this._logger.log(e.message);

      if (!transaction) await trx.rollback();

      throw new this._baseError(
        `${this._baseEntity.getTableName()}.create.sql_errors`,
      );
    }
  }
}
