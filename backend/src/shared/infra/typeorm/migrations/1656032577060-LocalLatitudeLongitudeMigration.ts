import { MigrationInterface, QueryRunner } from "typeorm";

export default class LocalLatitudeLongitudeMigration1656032577060 implements MigrationInterface {
    name = 'LocalLatitudeLongitudeMigration1656032577060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locais" ALTER COLUMN "latitude" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "locais" ALTER COLUMN "longitude" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locais" ALTER COLUMN "longitude" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "locais" ALTER COLUMN "latitude" TYPE integer`);
    }

}
