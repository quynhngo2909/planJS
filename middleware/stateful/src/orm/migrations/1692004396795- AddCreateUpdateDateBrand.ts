import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCreateUpdateDateBrand1692004396795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `alter table brand add column create_at timestamp default current_timestamp()`,
        );
        await queryRunner.query(
            `alter table brand add column update_at timestamp`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `alter table brand drop column create_at`,
        );
        await queryRunner.query(
            `alter table brand drop column update_at`,
        );
    }
}
