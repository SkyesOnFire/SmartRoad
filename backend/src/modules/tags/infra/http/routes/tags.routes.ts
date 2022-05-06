import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TagsController from '../controllers/TagsController';

const tagsRouter = Router();

const tagsController = new TagsController();

tagsRouter.get(
  '/tag/:id',
  ensureAuthenticated,
  tagsController.getone,
);

tagsRouter.get('/', ensureAuthenticated, tagsController.getall);

tagsRouter.post('/', tagsController.create);

tagsRouter.put(
  '/tag/:id',
  ensureAuthenticated,
  tagsController.update,
);

tagsRouter.delete(
  '/tag/:id',
  ensureAuthenticated,
  tagsController.delete,
);

export default tagsRouter;
