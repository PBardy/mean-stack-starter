import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('permission_group_permissions', table => {
    table.bigIncrements().unsigned().primary();
    table.bigInteger('permissionGroupId').unsigned().index().references('id').inTable('permission_groups').onDelete('cascade');
    table.bigInteger('permissionId').unsigned().index().references('id').inTable('permissions').onDelete('cascade');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('permission_group_permissions');
}
