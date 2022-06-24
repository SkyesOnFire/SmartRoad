import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Veiculo from '../infra/typeorm/entities/Veiculo';
import IVeiculosRepository from '../repositories/IVeiculosRepository';

interface IRequest {
  usuario_id: number;
}

@injectable()
class GetAllUsuarioVeiculosService {
  constructor(
    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,
  ) {}

  public async execute({
    usuario_id
  }: IRequest): Promise<Veiculo[]> {
    const veiculos = await this.veiculosRepository.findAllByUsuario(usuario_id);

    if (!veiculos) {
      throw new AppError('Nenhum veículo foi encontrado', 404);
    }

    for (let i = 0; i < veiculos.length; i++) {
      const veiculo: any = veiculos[i];

      veiculo.tag = await veiculo.tag;
    }

    return veiculos;
  }
}

export default GetAllUsuarioVeiculosService;
