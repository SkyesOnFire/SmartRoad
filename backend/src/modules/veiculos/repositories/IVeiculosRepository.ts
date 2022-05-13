import { DeleteResult } from 'typeorm';
import Veiculo from '../infra/typeorm/entities/Veiculo';
import ICreateVeiculoDTO from '../dtos/ICreateVeiculoDTO';

export default interface IVeiculosRepository {
  findAll(): Promise<Veiculo[]>;
  findById(veiculo_id: number): Promise<Veiculo | undefined>;
  findAllByTag(tag_id: string): Promise<Veiculo[]>;
  delete(veiculo_id: number): Promise<DeleteResult>;
  create(data: ICreateVeiculoDTO): Promise<Veiculo>;
  save(veiculo: Veiculo): Promise<Veiculo>;
}
