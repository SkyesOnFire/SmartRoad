import { sub } from 'date-fns';

export const newDate = (): Date => {
  const utcDate = sub(new Date(), { hours: 3 });

  return utcDate;
};

export const formatDate = (date?: any): Date | undefined => {
  const utcDate =
    date !== undefined
      ? new Date(new Date(date).toISOString().replace('.000Z', ''))
      : undefined;

  return utcDate;
};
