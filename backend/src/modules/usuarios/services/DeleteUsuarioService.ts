import { DeleteResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class DeleteUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute(usuario_id: number): Promise<DeleteResult> {
    const usuario = await this.usuariosRepository.delete(usuario_id);

    return usuario;
  }
}

export default DeleteUsuarioService;
