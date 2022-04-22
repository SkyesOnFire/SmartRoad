import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUsuarioService from '@modules/usuarios/services/AuthenticateUsuarioService';

export default class AnexosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { cpf, senha } = req.body;

    const authenticateUsuario = container.resolve(AuthenticateUsuarioService);

    const { usuario, token } = await authenticateUsuario.execute({
      senha,
      cpf,
    });

    usuario.senha = '';

    return res.status(201).json({ usuario, token });
  }
}
