import { StateEntity } from '../entities/state.entity';

export class StateResponseDTO {
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
