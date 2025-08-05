import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754428779603 implements MigrationInterface {
    name = 'Migration1754428779603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_code" ADD "purpose" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_code" DROP COLUMN "purpose"`);
    }

}
