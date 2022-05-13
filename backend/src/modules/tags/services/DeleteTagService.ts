import { DeleteResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import ITagsRepository from '../repositories/ITagsRepository';

@injectable()
class DeleteTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(tag_id: number): Promise<DeleteResult> {
    const tag = await this.tagsRepository.delete(tag_id);

    return tag;
  }
}

export default DeleteTagService;
