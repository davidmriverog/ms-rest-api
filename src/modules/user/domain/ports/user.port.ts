import { UserBo } from '../bo/user.bo';
import { IBasePort } from '@bomb/core/domain';

export interface UserPort extends IBasePort<UserBo> {

}

export const UserPort = Symbol('UserPort');
