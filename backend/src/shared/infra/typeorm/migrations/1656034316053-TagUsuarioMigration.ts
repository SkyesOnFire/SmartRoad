import { MigrationInterface, QueryRunner } from "typeorm";

export default class TagUsuarioMigration1656034316053 implements MigrationInterface {
    name = 'TagUsuarioMigration1656034316053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "usuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_139b11a015bc777e95e1832055d" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_139b11a015bc777e95e1832055d"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "usuarioId"`);
    }

}
