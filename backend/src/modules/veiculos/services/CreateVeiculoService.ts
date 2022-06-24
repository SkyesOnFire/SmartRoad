import { injectable, inject } from 'tsyringe';

import IVeiculosRepository from '../repositories/IVeiculosRepository';
import Veiculo from '../infra/typeorm/entities/Veiculo';
import AppError from '@shared/errors/AppError';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';

interface IRequest {
  placa: string;
  renavam?: string;
  cor: string;
  marca: string;
  modelo: string;
  usuario_id: number;
}

@injectable()
class CreateVeiculoService {
  constructor(
    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    placa,
    renavam,
    cor,
    marca,
    modelo,
    usuario_id,
  }: IRequest): Promise<Veiculo> {
    const checkIfExists = await this.veiculosRepository.findByPlacaOrRenavan(placa, renavam);

    if (checkIfExists) {
      throw new AppError('Essa placa ou renavan já foi usado em outro carro.', 403);
    }

    const usuario = await this.usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Usuário não existente", 404);
    }

    let veiculo: any = await this.veiculosRepository.create({
      placa,
      renavam,
      cor,
      marca,
      modelo,
    });

    veiculo.usuario = Promise.resolve(usuario);

    veiculo = await this.veiculosRepository.save(veiculo);

    return veiculo;
  }
}

export default CreateVeiculoService;
