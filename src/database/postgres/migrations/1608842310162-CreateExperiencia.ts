import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateExperiencia1608842310162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'experiencia',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4'
                    },
                    {
                        name: 'user_id',
                        type: 'uuid'
                    },
                    {
                        name: 'cargo',
                        type: 'varchar'
                    },
                    {
                        name: 'empresa',
                        type: 'varchar'
                    },
                    {
                        name: 'atribuicoes',
                        type: 'varchar'
                    },
                    {
                        name: 'ferramentas',
                        type: 'varchar'
                    },
                    {
                        name: 'remuneracao',
                        type: 'varchar'
                    },
                    {
                        name: 'data_inicio',
                        type: 'timestamp',
                    },
                    {
                        name: 'data_fim',
                        type: 'timestamp',
                    },
                    {
                        name: 'atual',
                        type: 'boolean'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'User',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('experiencia');
    }

}
