import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignInResponseDTO } from './dtos/sign-in-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async signIn(@Body() signInDTO: SignInDTO): Promise<SignInResponseDTO> {
    return this.authService.signIn(signInDTO);
  }
}
