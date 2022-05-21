export interface ISelectDTO {
  aux?: any;
  label: string;
  value: any;
}

export interface IPaginateDTO {
  from: any;
  to: any;
  per_page: any;
  total: number | any;
  current_page: number;
  prev_page?: number | null;
  next_page?: number | null;
  data: Array<object | any> | any;
}

export type IPaginationDTO = Omit<IPaginateDTO, 'data'>;

export interface IUsuariosDTO {
  id: number;
  nome: string;
  cpf: string;
  senha: string;
  cod_perfil: number;
  des_perfil: string;
  created_at: Date;
  updated_at: Date;
}

export interface IJWTDTO {
  id: number;
  cod_perfil: number;
}
