import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddPwd1715038978252 {
    name = 'AddPwd1715038978252'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
    }
}
