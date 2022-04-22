import 'reflect-metadata';
import 'es6-shim';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { format } from 'date-fns-tz';
import chalk from 'chalk';
import { newDate } from '@shared/utils/DateFormat';
import { pagination } from 'typeorm-pagination';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

import cron from 'node-cron';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(pagination);
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(
    `[${chalk.red('ERROR')}] ${chalk.gray.bold(
      format(newDate(), 'dd/MM/yy HH:mm:ss'),
    )} ${err}`,
  );

  if (process.env.NODE_ENV === 'dev') {
    return res.status(500).json({ status: 'error', message: err });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log(
    `[${chalk.cyan('INFO')}] ${chalk.gray.bold(
      format(newDate(), 'dd/MM/yy HH:mm:ss'),
    )} Server started at port: 3333 in ${process.env.NODE_ENV} ambient`,
  );
});

// cron.schedule("* * * * *", () => console.log("Executando a tarefa a cada 1 minuto"));

