import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CepResponse } from './dto/cep-response.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get(':cep')
  async findAll(@Param('cep') cep: string): Promise<CepResponse> {
    return this.correiosService.findAddressByCep(cep);
  }
}
