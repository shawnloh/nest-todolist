import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class createRolesTableAndUserRolesRoleJoinTable1615645481350
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_roles_role',
        columns: [
          {
            name: 'userId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'roleId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'user_roles_role',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
    await queryRunner.createForeignKey(
      'user_roles_role',
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_roles_role');
    await queryRunner.dropTable('roles');
  }
}
