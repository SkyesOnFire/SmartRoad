import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Local from '../infra/typeorm/entities/Local';
import ILocaisRepository from '../repositories/ILocaisRepository';

interface IRequest {
  usuario_id: number;
}

@injectable()
class GetAllUsuarioLocaisService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) {}

  public async execute({
    usuario_id
  }: IRequest): Promise<Local[]> {
    const locais = await this.locaisRepository.findAllByUsuario(usuario_id);

    if (!locais) {
      throw new AppError('Nenhum local foi encontrado', 404);
    }

    for (let i = 0; i < locais.length; i++) {
      const local: any = locais[i];

      local.usuario = await local.usuario;
    }

    return locais;
  }
}

export default GetAllUsuarioLocaisService;
