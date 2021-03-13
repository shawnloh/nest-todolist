import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createUserTable1615537470483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'pid',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
          },
        ],
      }),
      true,
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_PID',
        columnNames: ['pid'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_USER_PID');
    await queryRunner.dropTable('users');
  }
}
