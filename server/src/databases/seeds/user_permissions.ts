import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_permissions').del();
}
