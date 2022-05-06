import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class GetOneUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute(usuario_id: number): Promise<Usuario | undefined> {
    const usuario: any = await this.usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404);
    }

    usuario.senha = '';
    usuario.departamentos = await usuario.departamentos;

    return usuario;
  }
}

export default GetOneUsuarioService;
