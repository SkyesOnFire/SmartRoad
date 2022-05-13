import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import LeiturasController from '../controllers/LeiturasController';

const leiturasRouter = Router();

const leiturasController = new LeiturasController();

leiturasRouter.get(
  '/leitura/:id',
  ensureAuthenticated,
  leiturasController.getone,
);

leiturasRouter.get('/', ensureAuthenticated, leiturasController.getall);

leiturasRouter.post('/', leiturasController.create);

leiturasRouter.put(
  '/leitura/:id',
  ensureAuthenticated,
  leiturasController.update,
);

leiturasRouter.delete(
  '/leitura/:id',
  ensureAuthenticated,
  leiturasController.delete,
);

export default leiturasRouter;
