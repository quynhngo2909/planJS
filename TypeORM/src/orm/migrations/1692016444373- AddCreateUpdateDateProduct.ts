import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCreateUpdateDateProduct1692016444373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `alter table product add column create_at timestamp default current_timestamp()`,
        );
        await queryRunner.query(
            `alter table product add column update_at timestamp`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `alter table product drop column update_at`,
        );

        await queryRunner.query(
            `alter table product drop column create`,
        );
    }
}
