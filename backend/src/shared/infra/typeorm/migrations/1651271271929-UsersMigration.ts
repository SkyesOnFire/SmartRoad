import {
  MigrationInterface,
  QueryRunner
} from "typeorm";

export default class UsersMigration1651271271929 implements MigrationInterface {
  name = 'UsersMigration1651271271929'

  public async up(queryRunner: QueryRunner): Promise < void > {
    await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying, "senha" character varying NOT NULL, "cod_perfil" integer NOT NULL DEFAULT '0', "des_perfil" character varying NOT NULL DEFAULT 'Inicial', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ebebcaef8457dcff6e6d69f17b0" UNIQUE ("cpf"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise < void > {
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }

}
