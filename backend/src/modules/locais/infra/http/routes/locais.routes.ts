import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import LocaisController from '../controllers/LocaisController';

const locaisRouter = Router();

const locaisController = new LocaisController();

locaisRouter.get(
  '/local/:id',
  ensureAuthenticated,
  locaisController.getone,
);

locaisRouter.get('/', ensureAuthenticated, locaisController.getall);

locaisRouter.post('/', ensureAuthenticated, locaisController.create);

locaisRouter.put(
  '/local/:id',
  ensureAuthenticated,
  locaisController.update,
);

locaisRouter.delete(
  '/local/:id',
  ensureAuthenticated,
  locaisController.delete,
);

export default locaisRouter;
