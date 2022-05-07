import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Veiculo from '../infra/typeorm/entities/Veiculo';
import IVeiculosRepository from '../repositories/IVeiculosRepository';

@injectable()
class GetAllVeiculosService {
  constructor(
    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,
  ) {}

  public async execute(): Promise<Veiculo[]> {
    const veiculos = await this.veiculosRepository.findAll();

    if (!veiculos) {
      throw new AppError('Nenhum usuário foi encontrado', 404);
    }

    for (let i = 0; i < veiculos.length; i++) {
      const veiculo: any = veiculos[i];

      veiculo.tag = await veiculo.tag;
    }

    return veiculos;
  }
}

export default GetAllVeiculosService;
