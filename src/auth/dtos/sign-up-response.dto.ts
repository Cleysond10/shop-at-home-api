import { UserEntity } from "src/user/entities/user.entity";

export class SignUpResponseDTO {
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
  }
}
