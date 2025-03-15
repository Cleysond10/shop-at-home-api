import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { AddressResponseDTO } from './dtos/address-response.dto';
import { AddressEntity } from './entities/address.entity';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDTO,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<AddressResponseDTO[]> {
    return (await this.addressService.findAddressByUserId(userId)).map(
      (address) => new AddressResponseDTO(address),
    );
  }
}
