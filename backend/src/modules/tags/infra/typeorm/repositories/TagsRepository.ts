import { DeleteResult, getRepository, Repository } from 'typeorm';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';

import Tag from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async delete(tag_id: number): Promise<DeleteResult> {
    const tag = await this.ormRepository.delete(tag_id);

    return tag;
  }

  public async findAllByUsuario(usuario_id: number): Promise<Tag[]> {
    const tags = await this.ormRepository.find({
      where: {
        usuario: usuario_id,
      },
    });

    return tags;
  }

  public async findAll(): Promise<Tag[]> {
    const tag = await this.ormRepository.find({ order: { id: 'ASC' } });

    return tag;
  }

  public async findById(tag_id: number): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne(tag_id);

    return tag;
  }

  public async findByTag(cod_tag: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne({
      where: { cod_tag },
    });

    return tag;
  }

  public async create(tagData: ICreateTagDTO): Promise<Tag> {
    const tag = await this.ormRepository.create(tagData);

    await this.ormRepository.save(tag);

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    return this.ormRepository.save(tag);
  }
}

export default TagsRepository;
