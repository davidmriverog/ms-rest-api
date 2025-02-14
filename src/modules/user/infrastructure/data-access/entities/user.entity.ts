import { BaseEntity, Entity, Identity, UpdateColumn } from '@bomb/core/infrastructure/persistence';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Identity()
  id: number;

  username: string;
  userHash: string;
  createdAt: Date;

  @UpdateColumn()
  updatedAt: Date;
  deletedAt: Date;
}
