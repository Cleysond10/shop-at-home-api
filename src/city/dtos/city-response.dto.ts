import { StateResponseDTO } from '../../state/dtos/state-response.dto';
import { CityEntity } from '../entities/city.entity';

export class CityResponseDTO {
  name: string;
  state?: StateResponseDTO;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new StateResponseDTO(city.state) : undefined;
  }
}
