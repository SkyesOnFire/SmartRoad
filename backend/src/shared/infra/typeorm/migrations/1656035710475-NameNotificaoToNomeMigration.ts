import { MigrationInterface, QueryRunner } from "typeorm";

export default class NameNotificaoToNomeMigration1656035710475 implements MigrationInterface {
    name = 'NameNotificaoToNomeMigration1656035710475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" RENAME COLUMN "name" TO "nome"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" RENAME COLUMN "nome" TO "name"`);
    }

}
