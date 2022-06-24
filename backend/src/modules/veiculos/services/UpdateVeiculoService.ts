import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Veiculo from '../infra/typeorm/entities/Veiculo';
import IVeiculosRepository from '../repositories/IVeiculosRepository';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';

interface IRequest {
  veiculo_id: number;
  placa?: string;
  renavam?: string;
  cor?: string;
  marca?: string;
  modelo?: string;
  cod_tag?: string;
  usuario_id?: number;
}

@injectable()
class UpdateVeiculoService {
  constructor(
    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    veiculo_id,
    placa,
    renavam,
    cor,
    marca,
    modelo,
    cod_tag,
    usuario_id,
  }: IRequest): Promise<Veiculo> {
    const veiculo: any = await this.veiculosRepository.findById(veiculo_id);

    if (!veiculo) {
      throw new AppError('Veiculo não existe.', 404);
    }

    if (placa) {
      const checkIfExists = await this.veiculosRepository.findByPlacaOrRenavan(placa, undefined);

      if (checkIfExists && checkIfExists.id !== veiculo.id) {
        throw new AppError('Essa placa ou renavan já foi usado em outro carro.', 403);
      }

      veiculo.placa = placa;
    }
    if (renavam) {
      const checkIfExists = await this.veiculosRepository.findByPlacaOrRenavan(undefined, renavam);

      if (checkIfExists && checkIfExists.id !== veiculo.id) {
        throw new AppError('Essa placa ou renavan já foi usado em outro carro.', 403);
      }

      veiculo.renavam = renavam;
    }
    if (cor) {
      veiculo.cor = cor;
    }
    if (marca) {
      veiculo.marca = marca;
    }
    if (modelo) {
      veiculo.modelo = modelo;
    }
    if (cod_tag) {
      const tag = await this.tagsRepository.findByTag(cod_tag);

      if (!tag) {
        throw new AppError('Tag não existente', 404);
      }

      veiculo.tag = Promise.resolve(tag);
    }
    if (usuario_id) {
      const usuario = await this.usuariosRepository.findById(usuario_id);

      if (!usuario) {
        throw new AppError("Usuário não existente", 404);
      }

      veiculo.usuario = Promise.resolve(usuario);
    }

    await this.veiculosRepository.save(veiculo);

    return veiculo;
  }
}

export default UpdateVeiculoService;
