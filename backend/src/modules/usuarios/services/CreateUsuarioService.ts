import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import Usuario from '../infra/typeorm/entities/Usuario';

interface IRequest {
  nome: string;
  cpf: string;
  email?: string;
  senha: string;
  cod_perfil: string;
}

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    nome,
    cpf,
    email,
    senha,
    cod_perfil,
  }: IRequest): Promise<Usuario> {
    const checkIfExists = await this.usuariosRepository.findByCpf(cpf);

    if (checkIfExists) {
      throw new AppError('Esse cpf já foi usado em outro usuário.', 403);
    }

    const hashedPassord = await hash(senha, 8);

    let des_perfil = 'Inicial';
    switch (cod_perfil) {
      case '0':
        des_perfil = 'Inicial';
        break;
      case '1':
        des_perfil = 'Usuário';
        break;
      case '2':
        des_perfil = 'Administrador';
        break;
      default:
        throw new AppError('Código do perfil não identificado', 500);
    }

    const usuario = await this.usuariosRepository.create({
      nome,
      cpf,
      email,
      senha: hashedPassord,
      cod_perfil: parseInt(cod_perfil),
      des_perfil,
    });

    return usuario;
  }
}

export default CreateUsuarioService;
