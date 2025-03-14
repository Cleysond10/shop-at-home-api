import { UserResponseDto } from '../../user/dtos/user-response.dto';

export interface SignInResponseDto {
  user: UserResponseDto;
  accessToken: string;
}
