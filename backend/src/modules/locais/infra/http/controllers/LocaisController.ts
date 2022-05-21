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
      dt_ocorrencia,
      name,
    } = req.body;

    const createLocal = container.resolve(CreateLocalService);

    const notificacao = await createLocal.execute({
      dt_ocorrencia,
      name,
    });

    return res.status(201).json(instanceToPlain(notificacao));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: notificacao_id } = req.params;
    const {
      dt_ocorrencia,
      tag_id,
    } = req.body;

    const updateLocal = container.resolve(UpdateLocalService);

    const notificacao = await updateLocal.execute({
      notificacao_id: parseInt(notificacao_id),
      dt_ocorrencia,
      tag_id,
    });

    return res.json(instanceToPlain(notificacao));
  }
}
