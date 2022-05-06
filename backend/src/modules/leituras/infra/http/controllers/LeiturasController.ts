import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { container } from 'tsyringe';

import GetOneLeituraService from '@modules/leituras/services/GetOneLeituraService';
import GetAllLeiturasService from '@modules/leituras/services/GetAllLeiturasService';
import UpdateLeituraService from '@modules/leituras/services/UpdateLeituraService';
import CreateLeituraService from '@modules/leituras/services/CreateLeituraService';
import DeleteLeituraService from '@modules/leituras/services/DeleteLeituraService';

export default class LeiturasController {
  public async getone(req: Request, res: Response): Promise<Response> {
    const { id: leitura_id } = req.params;

    const getOneLeitura = container.resolve(GetOneLeituraService);
    const leitura = await getOneLeitura.execute(parseInt(leitura_id));

    return res.json(instanceToPlain(leitura));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: leitura_id } = req.params;

    const deleteLeitura = container.resolve(DeleteLeituraService);

    const leitura = await deleteLeitura.execute(parseInt(leitura_id));

    return res.json(instanceToPlain(leitura));
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const getAllLeituras = container.resolve(GetAllLeiturasService);
    const leituras = await getAllLeituras.execute();

    return res.json(instanceToPlain(leituras));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      dt_ocorrencia,
      tag_id,
    } = req.body;

    const createLeitura = container.resolve(CreateLeituraService);

    const leitura = await createLeitura.execute({
      dt_ocorrencia,
      tag_id,
    });

    return res.status(201).json(instanceToPlain(leitura));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: leitura_id } = req.params;
    const {
      dt_ocorrencia,
      tag_id,
    } = req.body;

    const updateLeitura = container.resolve(UpdateLeituraService);

    const leitura = await updateLeitura.execute({
      leitura_id: parseInt(leitura_id),
      dt_ocorrencia,
      tag_id,
    });

    return res.json(instanceToPlain(leitura));
  }
}
