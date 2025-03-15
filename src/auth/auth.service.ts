import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '../utils/password-handler';
import { UserResponseDTO } from '../user/dtos/user-response.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignInPayloadDTO } from './dtos/sign-in-payload.dto';
import { SignInResponseDTO } from './dtos/sign-in-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password}: SignInDTO): Promise<SignInResponseDTO> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({ ...new SignInPayloadDTO(user) }),
      user: new UserResponseDTO(user),
    };
  }
}
