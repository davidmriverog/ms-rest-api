import {
  BaseEntity,
  CreateColumn,
  Entity,
  Identity,
  RemoveColumn,
  UpdateColumn,
} from '@bomb/core/infrastructure/persistence';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Identity()
  id: number;

  username: string;
  userHash: string;

  @CreateColumn()
  createdAt: Date;

  @UpdateColumn()
  updatedAt: Date;

  @RemoveColumn()
  deletedAt: Date;
}
