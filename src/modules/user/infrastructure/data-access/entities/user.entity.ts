import { BaseEntity, Entity } from '@bomb/core/infrastructure/persistence';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  id: number;
  username: string;
  userHash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
