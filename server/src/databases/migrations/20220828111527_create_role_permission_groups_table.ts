import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('role_permission_groups', table => {
    table.bigIncrements().unsigned().primary();
    table.bigInteger('roleId').unsigned().index().references('id').inTable('roles').onDelete('cascade');
    table.bigInteger('permissionGroupId').unsigned().index().references('id').inTable('permission_groups').onDelete('cascade');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('role_permission_groups');
}
