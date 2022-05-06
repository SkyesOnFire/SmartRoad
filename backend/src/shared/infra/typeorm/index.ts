import { newDate } from '@shared/utils/DateFormat';
import chalk from 'chalk';
import { format } from 'date-fns';
import { createConnections } from 'typeorm';

createConnections().then((db_info) => {
  console.log(
    `[${chalk.cyan('INFO')}] ${chalk.gray.bold(
      format(newDate(), 'dd/MM/yy HH:mm:ss'),
    )} Database initialized (${db_info[0].options.database})`,
  );
});
