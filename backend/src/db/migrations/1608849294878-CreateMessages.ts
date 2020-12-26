import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMessages1608849294878 implements MigrationInterface {
  private table = new Table({
    name: 'messages',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'user_id',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'content',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });
  private foreingKey = new TableForeignKey({
      columnNames:['user_id'],
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      referencedTableName: 'users'
  })
  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
