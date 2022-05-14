import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import LocaisController from '../controllers/LocaisController';

const locaisRouter = Router();

const locaisController = new LocaisController();

locaisRouter.get(
  '/notificacao/:id',
  ensureAuthenticated,
  locaisController.getone,
);

locaisRouter.get('/', ensureAuthenticated, locaisController.getall);

locaisRouter.post('/', locaisController.create);

locaisRouter.put(
  '/notificacao/:id',
  ensureAuthenticated,
  locaisController.update,
);

locaisRouter.delete(
  '/notificacao/:id',
  ensureAuthenticated,
  locaisController.delete,
);

export default locaisRouter;
