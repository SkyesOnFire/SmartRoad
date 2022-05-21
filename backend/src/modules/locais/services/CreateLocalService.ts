import { injectable, inject } from 'tsyringe';

import ILocaisRepository from '../repositories/ILocaisRepository';
import Local from '../infra/typeorm/entities/Local';

interface IRequest {
  dt_ocorrencia?: Date;
  name: string;
}

@injectable()
class CreateLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) { }

  public async execute({
    dt_ocorrencia,
    name
  }: IRequest): Promise<Local> {
    if (!dt_ocorrencia) {
      dt_ocorrencia = new Date();
    }

    let local: any = await this.locaisRepository.create({
      dt_ocorrencia, name
    });

    local = await this.locaisRepository.save(local);

    return local;
  }
}

export default CreateLocalService;
