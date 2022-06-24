import { MigrationInterface, QueryRunner } from "typeorm";

export default class NotificacaoUsuarioMigration1656040090228 implements MigrationInterface {
    name = 'NotificacaoUsuarioMigration1656040090228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "usuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_759796c97bf84e75609b73f4388" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_759796c97bf84e75609b73f4388"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "usuarioId"`);
    }

}
