import { Knex } from 'knex';
import { RestLogger } from '@bomb/logger';
import { IRawToEntityMapper } from '@bomb/core/infrastructure';
import { BaseError } from '@bomb/core/domain';
import { BaseEntity, IRepository, TRowSelect } from '@bomb/core/infrastructure/persistence';


export abstract class KnexRepositoryImpl<I> implements IRepository<I> {
  _dataSource: Knex;
  _baseEntity: typeof BaseEntity;
  _baseError: typeof BaseError;
  _mapper: IRawToEntityMapper<I>;
  _logger: RestLogger;

  protected constructor(
    dataSource: Knex,
    mapper: IRawToEntityMapper<I>,
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

      return findList.map((it) => this._mapper.map(it));
    } catch (e) {
      this._logger.log(JSON.stringify(e));
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

      return this._mapper.map(findFirst);
    } catch (e) {
      this._logger.log(JSON.stringify(e));
      throw e;
    }
  }

  async create(attrs: I, transaction?: Knex.Transaction): Promise<I> {
    const trx = transaction ?? (await this._dataSource.transaction());

    try {
      const result = await this._dataSource(this._baseEntity.getTableName())
        .transacting(trx)
        .insert(attrs)
        .returning('*');

      if (!transaction) await trx.commit();

      return this._mapper.map(result[0]);
    } catch (e) {
      if (!transaction) await trx.rollback();

      this._logger.log(JSON.stringify(e));

      throw new this._baseError(
        `${this._baseEntity.getTableName()}.create.sql_errors`,
      );
    }
  }

  async update(id: number, attrs: I, transaction?: Knex.Transaction): Promise<I> {
    const trx = transaction ?? (await this._dataSource.transaction());

    try {
      const result = await this._dataSource(this._baseEntity.getTableName())
        .transacting(trx)
        .where(this._baseEntity.getIdentity(), id)
        .update(attrs)
        .returning('*');

      if (!transaction) await trx.commit();

      return this._mapper.map(result[0]);
    } catch (e) {
      if (!transaction) await trx.rollback();

      this._logger.log(JSON.stringify(e));

      throw new this._baseError(
        `${this._baseEntity.getTableName()}.create.sql_errors`,
      );
    }
  }
}
