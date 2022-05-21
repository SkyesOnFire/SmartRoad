import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterNotificacao1653091342585 implements MigrationInterface {
    name = 'AlterNotificacao1653091342585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locais" ("id" SERIAL NOT NULL, "dt_ocorrencia" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_42eaed01557782613d36365d300" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "tagId" integer`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_4b95902182d6d03a5d3dae1e9e8" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_4b95902182d6d03a5d3dae1e9e8"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "tagId"`);
        await queryRunner.query(`DROP TABLE "locais"`);
    }

}
