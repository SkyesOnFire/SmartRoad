import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { container } from 'tsyringe';

import GetOneNotificacaoService from '@modules/notificacoes/services/GetOneNotificacaoService';
import GetAllNotificacoesService from '@modules/notificacoes/services/GetAllNotificacoesService';
import UpdateNotificacaoService from '@modules/notificacoes/services/UpdateNotificacaoService';
import CreateNotificacaoService from '@modules/notificacoes/services/CreateNotificacaoService';
import DeleteNotificacaoService from '@modules/notificacoes/services/DeleteNotificacaoService';

export default class NotificacoesController {
  public async getone(req: Request, res: Response): Promise<Response> {
    const { id: notificacao_id } = req.params;

    const getOneNotificacao = container.resolve(GetOneNotificacaoService);
    const notificacao = await getOneNotificacao.execute(parseInt(notificacao_id));

    return res.json(instanceToPlain(notificacao));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: notificacao_id } = req.params;

    const deleteNotificacao = container.resolve(DeleteNotificacaoService);

    const notificacao = await deleteNotificacao.execute(parseInt(notificacao_id));

    return res.json(instanceToPlain(notificacao));
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const getAllNotificacoes = container.resolve(GetAllNotificacoesService);
    const notificacoes = await getAllNotificacoes.execute();

    return res.json(instanceToPlain(notificacoes));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      dt_ocorrencia,
      tag_id,
      name
    } = req.body;

    const createNotificacao = container.resolve(CreateNotificacaoService);

    const notificacao = await createNotificacao.execute({
      dt_ocorrencia,
      tag_id,
      name
    });

    return res.status(201).json(instanceToPlain(notificacao));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: notificacao_id } = req.params;
    const {
      dt_ocorrencia,
      tag_id,
    } = req.body;

    const updateNotificacao = container.resolve(UpdateNotificacaoService);

    const notificacao = await updateNotificacao.execute({
      notificacao_id: parseInt(notificacao_id),
      dt_ocorrencia,
      tag_id,
    });

    return res.json(instanceToPlain(notificacao));
  }
}
