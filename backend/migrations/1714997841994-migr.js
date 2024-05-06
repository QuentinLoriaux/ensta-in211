import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Migr1714997841994 {
    name = 'Migr1714997841994'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "like" (
                "movieId" character varying NOT NULL,
                "userId" character varying NOT NULL,
                CONSTRAINT "PK_00af9ddcc1e778bc47bc83cf336" PRIMARY KEY ("movieId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "movieId" character varying NOT NULL,
                "userId" character varying NOT NULL,
                "textContent" character varying NOT NULL,
                "date" character varying NOT NULL,
                CONSTRAINT "PK_cf5c891e1a6b75f82237a5cf2ca" PRIMARY KEY ("id", "movieId", "userId")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            DROP TABLE "like"
        `);
    }
}
