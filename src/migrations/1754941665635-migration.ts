import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754941665635 implements MigrationInterface {
    name = 'Migration1754941665635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_code" RENAME COLUMN "code" TO "hash_code"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_verified_email" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_verified_phone" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "otp_code" DROP COLUMN "hash_code"`);
        await queryRunner.query(`ALTER TABLE "otp_code" ADD "hash_code" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_code" DROP COLUMN "hash_code"`);
        await queryRunner.query(`ALTER TABLE "otp_code" ADD "hash_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_verified_phone"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_verified_email"`);
        await queryRunner.query(`ALTER TABLE "otp_code" RENAME COLUMN "hash_code" TO "code"`);
    }

}
