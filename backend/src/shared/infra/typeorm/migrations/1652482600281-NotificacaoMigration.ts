import { MigrationInterface, QueryRunner } from "typeorm";

export default class NotificacaoMigration1652482600281 implements MigrationInterface {
    name = 'NotificacaoMigration1652482600281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notificacoes" ("id" SERIAL NOT NULL, "dt_ocorrencia" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1161e00a97df46d9d3c5eed6545" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notificacoes"`);
    }

}
