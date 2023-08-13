import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateProductBrand1691856876728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "brand",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "price",
                        type: "double",
                    },
                    {
                        name: "brandId",
                        type: "int",
                    }
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "product",
            new TableForeignKey({
                columnNames: ["brandId"],
                referencedColumnNames: ["id"],
                referencedTableName: "brand",
                onDelete: "CASCADE",
            }),
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("product");
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("brandId") !== -1,
        );

        await queryRunner.dropForeignKey("product", foreignKey);
        await queryRunner.dropTable("product");
        await queryRunner.dropTable("brand");
    };
}
