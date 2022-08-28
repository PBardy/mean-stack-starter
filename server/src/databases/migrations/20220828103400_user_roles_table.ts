import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_roles', table => {
    table.bigIncrements().unsigned().primary();
    table.bigInteger('userId').unsigned().index().references('id').inTable('users').onDelete('cascade');
    table.bigInteger('roleId').unsigned().index().references('id').inTable('roles').onDelete('cascade');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_roles');
}
