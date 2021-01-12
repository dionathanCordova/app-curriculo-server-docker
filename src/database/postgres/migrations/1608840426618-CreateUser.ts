import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUser1608840426618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'whatsapp',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'bio',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'idade',
                        type: 'integer',
                    },
                    {
                        name: 'midias',
                        type: 'varchar',
                    },
                    {
                        name: 'genero',
                        type: 'varchar',
                    },
                    {
                        name: 'cidade',
                        type: 'varchar',
                    },
                    {
                        name: 'estado',
                        type: 'varchar',
                    },
                    {
                        name: 'bairro',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'password_reset_token',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'password_reset_expires',
                        type: 'timestamp with time zone',
                        isNullable: true,
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
