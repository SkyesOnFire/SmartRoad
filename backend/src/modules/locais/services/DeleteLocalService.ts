import { DeleteResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import ILocaisRepository from '../repositories/ILocaisRepository';

@injectable()
class DeleteLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) {}

  public async execute(notificacao_id: number): Promise<DeleteResult> {
    const notificacao = await this.locaisRepository.delete(notificacao_id);

    return notificacao;
  }
}

export default DeleteLocalService;
