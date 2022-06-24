import { MigrationInterface, QueryRunner } from "typeorm";

export default class LocalOnLeituraMigration1656031129010 implements MigrationInterface {
    name = 'LocalOnLeituraMigration1656031129010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leituras" ADD "localId" integer`);
        await queryRunner.query(`ALTER TABLE "leituras" ADD CONSTRAINT "FK_dd7dec890e9e7efb2232a45651a" FOREIGN KEY ("localId") REFERENCES "locais"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leituras" DROP CONSTRAINT "FK_dd7dec890e9e7efb2232a45651a"`);
        await queryRunner.query(`ALTER TABLE "leituras" DROP COLUMN "localId"`);
    }

}
