import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import NotificacoesController from '../controllers/NotificacoesController';

const notificacoesRouter = Router();

const notificacoesController = new NotificacoesController();

notificacoesRouter.get(
  '/notificacao/:id',
  ensureAuthenticated,
  notificacoesController.getone,
);

notificacoesRouter.get('/', ensureAuthenticated, notificacoesController.getall);

notificacoesRouter.post('/', notificacoesController.create);

notificacoesRouter.put(
  '/notificacao/:id',
  ensureAuthenticated,
  notificacoesController.update,
);

notificacoesRouter.delete(
  '/notificacao/:id',
  ensureAuthenticated,
  notificacoesController.delete,
);

export default notificacoesRouter;
