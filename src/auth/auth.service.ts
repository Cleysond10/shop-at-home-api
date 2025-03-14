import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '../utils/password';
import { UserResponseDto } from '../user/dtos/user-response.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInPayloadDto } from './dtos/sign-in-payload.dto';
import { SignInResponseDto } from './dtos/sign-in-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(signInDto.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      signInDto.password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({ ...new SignInPayloadDto(user) }),
      user: new UserResponseDto(user),
    };
  }
}
