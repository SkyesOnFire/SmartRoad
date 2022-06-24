import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Local from '../infra/typeorm/entities/Local';
import ILocaisRepository from '../repositories/ILocaisRepository';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';

interface IRequest {
  local_id: number;
  nome: string;
  endereco_completo: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
  usuario_id: number;
}

@injectable()
class UpdateLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) { }

  public async execute({
    local_id,
    nome,
    endereco_completo,
    cidade,
    estado,
    latitude,
    longitude,
    usuario_id,
  }: IRequest): Promise<Local> {
    let local = await this.locaisRepository.findById(local_id);

    if (!local) {
      throw new AppError('Local não existe.', 404);
    }

    if (nome) {
      local.nome = nome;
    }

    if (endereco_completo) {
      local.endereco_completo = endereco_completo;
    }

    if (cidade) {
      local.cidade = cidade;
    }

    if (estado) {
      local.estado = estado;
    }

    if (latitude) {
      local.latitude = latitude;
    }

    if (longitude) {
      local.longitude = longitude;
    }

    if (usuario_id) {
      const usuario = await this.usuariosRepository.findById(usuario_id);

      if (!usuario) {
        throw new AppError("Usuário não existente", 404);
      }

      local.usuario = Promise.resolve(usuario);
    }

    local = await this.locaisRepository.save(local);

    return local;
  }
}

export default UpdateLocalService;
