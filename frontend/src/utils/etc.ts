/* eslint-disable no-param-reassign */
export const tratarValorToNumber = (valor: string) => {
  const valorString = valor
    .replace('R$ ', '')
    .replace('.', '')
    .replace(',', '.');

  const split = valorString.split('.');

  if (
    split.length > 1 &&
    split[split.length - 1] &&
    split[split.length - 1].length === 3
  ) {
    split[split.length - 1] = split[split.length - 1].substring(
      0,
      split[split.length - 1].length - 1
    );
  }

  const valorFinal = parseFloat(`${split[0]}.${split[1]}`);

  return valorFinal;
};

export const tratarValorToString = (valor: number): string => {
  let valor_final = valor.toString();

  valor_final = valor_final.replace('.', ',');

  valor_final = `R$ ${valor_final}`;
  if (valor_final.includes(',') && valor_final.split(',')[1].length < 2) {
    valor_final = `${valor_final}0`;
  } else if (!valor_final.includes(',')) {
    valor_final = `${valor_final},00`;
  }

  return valor_final;
};

export const tratarValorObjeto = (row_data: any, dat: any): string => {
  const tmp_dat = [
    row_data.split('.')[0],
    row_data.split('.')[1],
    row_data.split('.')[2],
    row_data.split('.')[3],
  ];
  let t_dat;
  if (tmp_dat[3] !== undefined) {
    t_dat =
      (dat[tmp_dat[0]] &&
        dat[tmp_dat[0]][tmp_dat[1]] &&
        dat[tmp_dat[0]][tmp_dat[1]][tmp_dat[2]] &&
        dat[tmp_dat[0]][tmp_dat[1]][tmp_dat[2]][tmp_dat[3]]) ||
      undefined;
  } else if (tmp_dat[2] !== undefined) {
    t_dat =
      (dat[tmp_dat[0]] &&
        dat[tmp_dat[0]][tmp_dat[1]] &&
        dat[tmp_dat[0]][tmp_dat[1]][tmp_dat[2]]) ||
      undefined;
  } else if (tmp_dat[1] !== undefined) {
    t_dat = (dat[tmp_dat[0]] && dat[tmp_dat[0]][tmp_dat[1]]) || undefined;
  }
  return t_dat && dat[tmp_dat[0]] ? t_dat.toString() : undefined;
};

export interface IOrder {
  orderBy: string;
  orderByDir: 'ASC' | 'DESC';
}

export const createFilteredUrl = (
  url: string,
  filterObj: any | undefined,
  order?: IOrder
): any => {
  if (filterObj) {
    const keys = Object.keys(filterObj);

    keys.forEach(key => {
      if (filterObj[key]) {
        url += `${url.includes('?') ? '&' : '?'}${key}=${filterObj[key]}`;
      }
    });
  }

  if (order) {
    url += `${url.includes('?') ? '&' : '?'}orderby=${
      order.orderBy
    }&orderbydir=${order.orderByDir}`;
  }

  return url;
};

export const delay = (ms: number): Promise<any> =>
  new Promise(res => setTimeout(res, ms));
