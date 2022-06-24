import { MigrationInterface, QueryRunner } from "typeorm";

export default class LocalMigration1656031129005 implements MigrationInterface {
    name = 'LocalMigration1656031129005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locais" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "endereco_completo" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_42eaed01557782613d36365d300" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "locais" ADD CONSTRAINT "FK_a81b9cbaac15fb360796107d279" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locais" DROP CONSTRAINT "FK_a81b9cbaac15fb360796107d279"`);
        await queryRunner.query(`DROP TABLE "locais"`);
    }

}
