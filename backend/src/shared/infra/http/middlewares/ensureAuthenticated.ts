import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  cod_perfil: number;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Usuário não autenticado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    if (!authConfig.jwt.secret) {
      throw new AppError('No secret', 500);
    }

    const decoded = verify(token, authConfig.jwt.secret);

    const { cod_perfil, sub } = decoded as TokenPayload;

    req.usuario = {
      id: parseInt(sub),
      cod_perfil,
    };

    return next();
  } catch {
    throw new AppError('Token de autenticação inválido', 401);
  }
}
