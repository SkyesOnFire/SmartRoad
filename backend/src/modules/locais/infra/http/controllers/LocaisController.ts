import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { container } from 'tsyringe';

import GetOneLocalService from '@modules/locais/services/GetOneLocalService';
import GetAllLocaisService from '@modules/locais/services/GetAllLocaisService';
import UpdateLocalService from '@modules/locais/services/UpdateLocalService';
import CreateLocalService from '@modules/locais/services/CreateLocalService';
import DeleteLocalService from '@modules/locais/services/DeleteLocalService';

export default class LocaisController {
  public async getone(req: Request, res: Response): Promise<Response> {
    const { id: notificacao_id } = req.params;

    const getOneLocal = container.resolve(GetOneLocalService);
    const notificacao = await getOneLocal.execute(parseInt(notificacao_id));

    return res.json(instanceToPlain(notificacao));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: notificacao_id } = req.params;

    const deleteLocal = container.resolve(DeleteLocalService);

    const notificacao = await deleteLocal.execute(parseInt(notificacao_id));

    return res.json(instanceToPlain(notificacao));
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const getAllLocais = container.resolve(GetAllLocaisService);
    const locais = await getAllLocais.execute();

    return res.json(instanceToPlain(locais));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      nome,
      endereco_completo,
      cidade,
      estado,
      latitude,
      longitude,
    } = req.body;

    const { id: usuario_id } = req.usuario;

    const createLocal = container.resolve(CreateLocalService);

    const notificacao = await createLocal.execute({
      nome,
      endereco_completo,
      cidade,
      estado,
      latitude,
      longitude,
      usuario_id,
    });

    return res.status(201).json(instanceToPlain(notificacao));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: local_id } = req.params;
    const {
      nome,
      endereco_completo,
      cidade,
      estado,
      latitude,
      longitude,
      usuario_id,
    } = req.body;

    const updateLocal = container.resolve(UpdateLocalService);

    const notificacao = await updateLocal.execute({
      local_id: parseInt(local_id),
      nome,
      endereco_completo,
      cidade,
      estado,
      latitude,
      longitude,
      usuario_id,
    });

    return res.json(instanceToPlain(notificacao));
  }
}
