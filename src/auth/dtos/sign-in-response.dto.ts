import { UserResponseDTO } from '../../user/dtos/user-response.dto';

export interface SignInResponseDTO {
  user: UserResponseDTO;
  accessToken: string;
}
