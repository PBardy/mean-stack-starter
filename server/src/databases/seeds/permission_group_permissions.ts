import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('permission_group_permissions').del();
}
