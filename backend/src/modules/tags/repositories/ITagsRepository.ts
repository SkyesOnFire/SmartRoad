import { DeleteResult } from 'typeorm';
import Tag from '../infra/typeorm/entities/Tag';
import ICreateTagDTO from '../dtos/ICreateTagDTO';

export default interface ITagsRepository {
  findAll(): Promise<Tag[]>;
  findById(tag_id: number): Promise<Tag | undefined>;
  findByTag(cod_tag: string): Promise<Tag | undefined>;
  delete(tag_id: number): Promise<DeleteResult>;
  create(data: ICreateTagDTO): Promise<Tag>;
  save(tag: Tag): Promise<Tag>;
}
