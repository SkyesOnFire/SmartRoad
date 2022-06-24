import { injectable, inject } from 'tsyringe';

import ILocaisRepository from '../repositories/ILocaisRepository';
import Local from '../infra/typeorm/entities/Local';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  nome: string;
  endereco_completo: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
  usuario_id: number;
}

@injectable()
class CreateLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) { }

  public async execute({
    nome,
    endereco_completo,
    cidade,
    estado,
    latitude,
    longitude,
    usuario_id,
  }: IRequest): Promise<Local> {
    const usuario = await this.usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Usuário não existente", 404);
    }

    let local: any = await this.locaisRepository.create({
      nome,
      endereco_completo,
      cidade,
      estado,
      latitude,
      longitude,
    });

    local.usuario = Promise.resolve(usuario);

    local = await this.locaisRepository.save(local);

    return local;
  }
}

export default CreateLocalService;
