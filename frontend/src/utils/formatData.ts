import { format } from 'date-fns-tz';

export function formatDateWithHour(date: string | Date): string {
  const formattedDate = formatDate(date);

  return formattedDate
    ? format(formattedDate, 'dd/MM/yyyy HH:mm', {
        timeZone: 'America/Sao_Paulo',
      })
    : '';
}

export function formatDate(date?: string | number | Date): Date | undefined {
  const utcDate =
    date !== undefined && date !== null
      ? new Date(new Date(date).toISOString().replace('.000Z', ''))
      : undefined;

  return utcDate;
}
export function formatSimpleDate(date: string | Date): string {
  const formattedDate = formatDate(date);

  return formattedDate ? format(formattedDate, 'dd/MM') : '';
}
export function formatBRDate(date: string | Date): string {
  const formattedDate = formatDate(date);

  return formattedDate ? format(formattedDate, 'dd/MM/yyyy') : '';
}
export function formatHour(date: string | Date): string {
  const formattedDate = formatDate(date);

  return formattedDate ? format(formattedDate, 'HH:mm') : '';
}
export function formatDateInput(date: string | Date): string {
  const formattedDate = formatDate(date);
  return formattedDate ? format(formattedDate, 'yyyy-MM-dd') : '';
}
