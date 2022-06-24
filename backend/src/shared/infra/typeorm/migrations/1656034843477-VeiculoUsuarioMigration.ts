import { MigrationInterface, QueryRunner } from "typeorm";

export default class VeiculoUsuarioMigration1656034843477 implements MigrationInterface {
    name = 'VeiculoUsuarioMigration1656034843477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculos" ADD "usuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "veiculos" ADD CONSTRAINT "FK_f54ce6b7158315f8dcb11fc817b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculos" DROP CONSTRAINT "FK_f54ce6b7158315f8dcb11fc817b"`);
        await queryRunner.query(`ALTER TABLE "veiculos" DROP COLUMN "usuarioId"`);
    }

}
