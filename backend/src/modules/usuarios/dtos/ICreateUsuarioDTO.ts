export default interface ICreateUsuarioDTO {
  nome: string;
  cpf: string;
  email?: string;
  senha: string;
  cod_perfil: number;
  des_perfil: string;
}
