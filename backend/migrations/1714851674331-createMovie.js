import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class CreateMovie1714851674331 {
    name = 'CreateMovie1714851674331'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "description" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_559d6f296528cb7bd6f671c378f"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_a81090ad0ceb645f30f9399c347" PRIMARY KEY ("title")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_a81090ad0ceb645f30f9399c347"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_559d6f296528cb7bd6f671c378f" PRIMARY KEY ("title", "id")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_559d6f296528cb7bd6f671c378f"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_a81090ad0ceb645f30f9399c347" PRIMARY KEY ("title")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_a81090ad0ceb645f30f9399c347"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_559d6f296528cb7bd6f671c378f" PRIMARY KEY ("title", "id")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "description"
        `);
    }
}
