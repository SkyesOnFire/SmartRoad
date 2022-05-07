import { MigrationInterface, QueryRunner } from "typeorm";

export default class VeiculoMigration1651880966905 implements MigrationInterface {
    name = 'VeiculoMigration1651880966905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "veiculos" ("id" SERIAL NOT NULL, "placa" character varying NOT NULL, "renavam" character varying, "cor" character varying NOT NULL, "marca" character varying NOT NULL, "modelo" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tagId" integer, CONSTRAINT "UQ_3c7f2de70c4765a04c070a9f745" UNIQUE ("placa"), CONSTRAINT "UQ_5d413f906ffd77aeb3356b8a031" UNIQUE ("renavam"), CONSTRAINT "REL_b279cc046c3863ac432d0522b5" UNIQUE ("tagId"), CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "veiculos" ADD CONSTRAINT "FK_b279cc046c3863ac432d0522b55" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculos" DROP CONSTRAINT "FK_b279cc046c3863ac432d0522b55"`);
        await queryRunner.query(`DROP TABLE "veiculos"`);
    }

}
