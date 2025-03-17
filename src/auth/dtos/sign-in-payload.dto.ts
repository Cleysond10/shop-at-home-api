import { UserEntity } from '../../user/entities/user.entity';

export class SignInPayloadDTO {
  id: number;
  userType: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.userType = user.type;
  }
}
