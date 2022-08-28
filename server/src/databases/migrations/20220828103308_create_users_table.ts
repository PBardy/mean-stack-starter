import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('fullName').notNullable();
    table.bigInteger('roleId').nullable().unsigned().index().references('id').inTable('roles').onDelete('set null');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
