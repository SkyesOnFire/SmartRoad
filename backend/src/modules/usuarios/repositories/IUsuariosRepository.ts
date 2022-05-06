import { DeleteResult } from 'typeorm';
import Usuario from '../infra/typeorm/entities/Usuario';
import ICreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';

export default interface IUsuariosRepository {
  findAll(): Promise<Usuario[]>;
  findById(usuario_id: number): Promise<Usuario | undefined>;
  findByCpf(cpf: string): Promise<Usuario | undefined>;
  findAllByPerfil(cod_perfil: number): Promise<Usuario[]>;
  delete(usuario_id: number): Promise<DeleteResult>;
  create(data: ICreateUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
}
