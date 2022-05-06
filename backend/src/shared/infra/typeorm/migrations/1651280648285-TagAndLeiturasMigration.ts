import {MigrationInterface, QueryRunner} from "typeorm";

export default class TagAndLeiturasMigration1651280648285 implements MigrationInterface {
    name = 'TagAndLeiturasMigration1651280648285'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "cod_tag" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_59a4ad0b2e0f36438d71ba22769" UNIQUE ("cod_tag"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "leituras" ("id" SERIAL NOT NULL, "dt_ocorrencia" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tagId" integer, CONSTRAINT "PK_e373388a038ac75f5840995731b" PRIMARY KEY ("id"))`);
      await queryRunner.query(`ALTER TABLE "leituras" ADD CONSTRAINT "FK_6b0ad30166a6dd4eb188f92ce27" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "leituras" DROP CONSTRAINT "FK_6b0ad30166a6dd4eb188f92ce27"`);
      await queryRunner.query(`DROP TABLE "leituras"`);
      await queryRunner.query(`DROP TABLE "tags"`);
  }

}
