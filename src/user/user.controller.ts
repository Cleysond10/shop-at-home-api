import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserResponseDTO } from './dtos/user-response.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserType.Root)
  @Post('/admin')
  async createAdmin(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserType.Admin);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/all')
  async getAllUser(): Promise<UserResponseDTO[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new UserResponseDTO(userEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<UserResponseDTO> {
    return new UserResponseDTO(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updateUserPassword(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updateUserPassword(updatePasswordDTO, userId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async getInfoUser(@UserId() userId: number): Promise<UserResponseDTO> {
    return new UserResponseDTO(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }
}
