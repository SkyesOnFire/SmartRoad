import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  usuario_id: number;
  nome?: string;
  email?: string;
  cpf?: string;
  cod_perfil: string;
  senha: string;
  confirmarSenha: string;
}

@injectable()
class UpdateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    usuario_id,
    nome,
    email,
    cpf,
    senha,
    confirmarSenha,
    cod_perfil,
  }: IRequest): Promise<Usuario> {
    const usuario: any = await this.usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError('Usuario não existe.', 404);
    }

    if (nome) {
      usuario.nome = nome;
    }
    if (email) {
      usuario.email = email;
    }
    if (cpf) {
      const alreadyUsedCpf = await this.usuariosRepository.findByCpf(cpf);
      if (alreadyUsedCpf && alreadyUsedCpf.id !== usuario_id) {
        throw new AppError('Esse CPF já foi usado.');
      }
      usuario.cpf = cpf;
    }
    if (senha) {
      if (senha !== confirmarSenha) {
        throw new AppError('Senhas diferentes.');
      }

      const hashedPassord = await hash(senha, 8);

      usuario.senha = hashedPassord;
    }
    if (cod_perfil !== undefined && cod_perfil !== null) {
      let des_perfil = '';

      // 0 - Inicial / 1 - Administrativo / 2 - Comercial / 3 - Coordenadores / 4 - Técnico
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

      usuario.cod_perfil = cod_perfil;
      usuario.des_perfil = des_perfil;
    }

    await this.usuariosRepository.save(usuario);

    return usuario;
  }
}

export default UpdateUsuarioService;
