import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753822340963 implements MigrationInterface {
    name = 'Migration1753822340963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp_code" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_c2c773c7da0f03da4a23c4066a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "otp_code" ADD CONSTRAINT "FK_48f78465fa5f22ceaaa2175b168" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_code" DROP CONSTRAINT "FK_48f78465fa5f22ceaaa2175b168"`);
        await queryRunner.query(`DROP TABLE "otp_code"`);
    }

}
