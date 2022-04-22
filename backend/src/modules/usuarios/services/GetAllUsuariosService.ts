import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class GetAllUsuariosService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute(): Promise<Usuario[]> {
    const usuarios = await this.usuariosRepository.findAll();

    if (!usuarios) {
      throw new AppError('Nenhum usuário foi encontrado', 404);
    }

    for (let i = 0; i < usuarios.length; i++) {
      const usuario = usuarios[i];

      usuario.senha = '';
    }

    return usuarios;
  }
}

export default GetAllUsuariosService;
