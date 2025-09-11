import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1757529948778 implements MigrationInterface {
    name = 'Migration1757529948778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deletedAt"`);
    }

}
