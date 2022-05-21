import { DeleteResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import ILocaisRepository from '../repositories/ILocaisRepository';

@injectable()
class DeleteLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) { }

  public async execute(local_id: number): Promise<DeleteResult> {
    const local: any = await this.locaisRepository.delete(local_id);

    return local;
  }
}

export default DeleteLocalService;
