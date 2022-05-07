import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { container } from 'tsyringe';

import GetOneVeiculoService from '@modules/veiculos/services/GetOneVeiculoService';
import GetAllVeiculosService from '@modules/veiculos/services/GetAllVeiculosService';
import UpdateVeiculoService from '@modules/veiculos/services/UpdateVeiculoService';
import CreateVeiculoService from '@modules/veiculos/services/CreateVeiculoService';
import DeleteVeiculoService from '@modules/veiculos/services/DeleteVeiculoService';

export default class VeiculosController {
  public async getone(req: Request, res: Response): Promise<Response> {
    const { id: veiculo_id } = req.params;

    const getOneVeiculo = container.resolve(GetOneVeiculoService);
    const veiculo = await getOneVeiculo.execute(parseInt(veiculo_id));

    return res.json(instanceToPlain(veiculo));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: veiculo_id } = req.params;

    const deleteVeiculo = container.resolve(DeleteVeiculoService);

    const veiculo = await deleteVeiculo.execute(parseInt(veiculo_id));

    return res.json(instanceToPlain(veiculo));
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const getAllVeiculos = container.resolve(GetAllVeiculosService);
    const veiculos = await getAllVeiculos.execute();

    return res.json(instanceToPlain(veiculos));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      placa,
      renavam,
      cor,
      marca,
      modelo,
    } = req.body;

    const createVeiculo = container.resolve(CreateVeiculoService);

    const veiculo = await createVeiculo.execute({
      placa,
      renavam,
      cor,
      marca,
      modelo,
    });

    return res.status(201).json(instanceToPlain(veiculo));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: veiculo_id } = req.params;
    const {
      placa,
      renavam,
      cor,
      marca,
      modelo,
      tag_id,
    } = req.body;

    const updateVeiculo = container.resolve(UpdateVeiculoService);

    const veiculo = await updateVeiculo.execute({
      veiculo_id: parseInt(veiculo_id),
      placa,
      renavam,
      cor,
      marca,
      modelo,
      tag_id,
    });

    return res.json(instanceToPlain(veiculo));
  }
}
