import { DeleteResult, getRepository, Repository } from 'typeorm';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ICreateUsuarioDTO from '@modules/usuarios/dtos/ICreateUsuarioDTO';

import Usuario from '../entities/Usuario';

class UsuariosRepository implements IUsuariosRepository {
  private ormRepository: Repository<Usuario>;

  constructor() {
    this.ormRepository = getRepository(Usuario);
  }

  public async delete(usuario_id: number): Promise<DeleteResult> {
    const usuario = await this.ormRepository.delete(usuario_id);

    return usuario;
  }

  public async findAll(): Promise<Usuario[]> {
    const usuario = await this.ormRepository.find({ order: { id: 'ASC' } });

    return usuario;
  }

  public async findAllByPerfil(cod_perfil: number): Promise<Usuario[]> {
    const usuarios = await this.ormRepository.find({
      where: {
        cod_perfil,
      },
    });

    return usuarios;
  }

  public async findById(usuario_id: number): Promise<Usuario | undefined> {
    const usuario = await this.ormRepository.findOne(usuario_id);

    return usuario;
  }

  public async findByCpf(cpf: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepository.findOne({
      where: { cpf },
    });

    return usuario;
  }

  public async create(usuarioData: ICreateUsuarioDTO): Promise<Usuario> {
    const usuario = await this.ormRepository.create(usuarioData);

    await this.ormRepository.save(usuario);

    return usuario;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    return this.ormRepository.save(usuario);
  }
}

export default UsuariosRepository;
