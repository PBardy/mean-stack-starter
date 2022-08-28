import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('role_permission_groups').del();
}
