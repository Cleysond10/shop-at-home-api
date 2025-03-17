import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { SignInResponseDTO } from './dtos/sign-in-response.dto';
import { SignUpResponseDTO } from './dtos/sign-up-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/signin')
  async signIn(@Body() signInDTO: SignInDTO): Promise<SignInResponseDTO> {
    return this.authService.signIn(signInDTO);
  }

  @Post('/signup')
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<SignUpResponseDTO> {
    return new SignUpResponseDTO(await this.authService.signUp(signUpDTO));
  }
}
