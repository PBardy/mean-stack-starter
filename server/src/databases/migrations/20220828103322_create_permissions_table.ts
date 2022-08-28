import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('permissions', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.string('tag').notNullable();
    table.string('label').notNullable();
    table.string('description').notNullable();
    table.boolean('protected').notNullable().defaultTo(false);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('permissions');
}
