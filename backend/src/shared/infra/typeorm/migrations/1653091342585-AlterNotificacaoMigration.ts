import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNotificacaoMigration1653091342585 implements MigrationInterface {
    name = 'AlterNotificacaoMigration1653091342585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "tagId" integer`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_4b95902182d6d03a5d3dae1e9e8" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_4b95902182d6d03a5d3dae1e9e8"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "tagId"`);
    }

}
