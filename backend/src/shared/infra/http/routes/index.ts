import { Router } from 'express';

import usuariosRouter from '@modules/usuarios/infra/http/routes/usuarios.routes';
import sessionsRouter from '@modules/usuarios/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
