import { CityResponseDTO } from '../../city/dtos/city-response.dto';
import { AddressEntity } from '../entities/address.entity';

export class AddressResponseDTO {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  city?: CityResponseDTO;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new CityResponseDTO(address.city) : undefined;
  }
}
