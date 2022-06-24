import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { container } from 'tsyringe';

import GetOneTagService from '@modules/tags/services/GetOneTagService';
import GetAllTagsService from '@modules/tags/services/GetAllTagsService';
import UpdateTagService from '@modules/tags/services/UpdateTagService';
import CreateTagService from '@modules/tags/services/CreateTagService';
import DeleteTagService from '@modules/tags/services/DeleteTagService';
import GetAllUsuarioTagsService from '@modules/tags/services/GetAllUsuarioTagsService';

export default class TagsController {
  public async getone(req: Request, res: Response): Promise<Response> {
    const { id: tag_id } = req.params;

    const getOneTag = container.resolve(GetOneTagService);
    const tag = await getOneTag.execute(parseInt(tag_id));

    return res.json(instanceToPlain(tag));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: tag_id } = req.params;

    const deleteTag = container.resolve(DeleteTagService);

    const tag = await deleteTag.execute(parseInt(tag_id));

    return res.json(instanceToPlain(tag));
  }

  public async getallbyusuario(req: Request, res: Response): Promise<Response> {
    const getAllUsuarioTags = container.resolve(GetAllUsuarioTagsService);
    const tags = await getAllUsuarioTags.execute({ usuario_id: req.usuario.id });

    return res.json(instanceToPlain(tags));
  }

  public async getall(req: Request, res: Response): Promise<Response> {
    const getAllTags = container.resolve(GetAllTagsService);
    const tags = await getAllTags.execute();

    return res.json(instanceToPlain(tags));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      cod_tag,
    } = req.body;

    const { id: usuario_id } = req.usuario;

    const createTag = container.resolve(CreateTagService);

    const tag = await createTag.execute({
      cod_tag: cod_tag,
      usuario_id,
    });

    return res.status(201).json(instanceToPlain(tag));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: tag_id } = req.params;
    const {
      cod_tag,
      usuario_id,
    } = req.body;

    const updateTag = container.resolve(UpdateTagService);

    const tag = await updateTag.execute({
      tag_id: parseInt(tag_id),
      cod_tag,
      usuario_id,
    });

    return res.json(instanceToPlain(tag));
  }
}
