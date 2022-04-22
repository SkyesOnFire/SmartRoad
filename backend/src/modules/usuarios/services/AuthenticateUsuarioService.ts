import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  cpf: string;
  senha: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
}

@injectable()
class AuthenticateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({ cpf, senha }: IRequest): Promise<IResponse> {
    const usuario = await this.usuariosRepository.findByCpf(cpf);

    if (!usuario) {
      throw new AppError('Combinação de cpf/senha incorreta.', 401);
    }

    const passwordMatched = await compare(senha, usuario.senha);

    if (!passwordMatched) {
      throw new AppError('Combinação cpf/senha incorreta.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) {
      throw new AppError('No secret', 500);
    }

    const token = sign({ cod_perfil: usuario.cod_perfil }, secret, {
      subject: usuario.id.toString(),
      expiresIn,
    });

    return { usuario, token };
  }
}

export default AuthenticateUsuarioService;
