import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { container } from 'tsyringe';

import GetOneUsuarioService from '@modules/usuarios/services/GetOneUsuarioService';
import GetAllUsuariosService from '@modules/usuarios/services/GetAllUsuariosService';
import UpdateUsuarioService from '@modules/usuarios/services/UpdateUsuarioService';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import DeleteUsuarioService from '@modules/usuarios/services/DeleteUsuarioService';

export default class UsuariosController {
  public async getone(req: Request, res: Response): Promise<Response> {
    const { id: usuario_id } = req.params;

    const getOneUsuario = container.resolve(GetOneUsuarioService);
    const usuario = await getOneUsuario.execute(parseInt(usuario_id));

    return res.json(instanceToPlain(usuario));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: usuario_id } = req.params;

    const deleteUsuario = container.resolve(DeleteUsuarioService);

    const usuario = await deleteUsuario.execute(parseInt(usuario_id));

    return res.json(instanceToPlain(usuario));
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const getAllUsuarios = container.resolve(GetAllUsuariosService);
    const usuarios = await getAllUsuarios.execute();

    return res.json(instanceToPlain(usuarios));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      nome: usuario_name,
      cpf: usuario_cpf,
      email: usuario_email,
      senha,
      cod_perfil: usuario_cod_perfil,
    } = req.body;

    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      nome: usuario_name,
      cpf: usuario_cpf,
      email: usuario_email,
      senha,
      cod_perfil: usuario_cod_perfil,
    });

    return res.status(201).json(instanceToPlain(usuario));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: usuario_id } = req.params;
    const {
      nome: usuario_name,
      email: usuario_email,
      cpf: usuario_cpf,
      senha,
      confirmarSenha,
      cod_perfil: usuario_cod_perfil,
    } = req.body;

    const updateUsuario = container.resolve(UpdateUsuarioService);

    const usuario = await updateUsuario.execute({
      usuario_id: parseInt(usuario_id),
      nome: usuario_name,
      email: usuario_email,
      cpf: usuario_cpf,
      senha,
      confirmarSenha,
      cod_perfil: usuario_cod_perfil,
    });

    return res.json(instanceToPlain(usuario));
  }
}
