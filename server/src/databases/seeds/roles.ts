import { RoleEnum } from '../../enums/role.enum';
import { RoleShape } from '../../models/role.model';
import { Knex } from 'knex';
import { randomUUID } from 'crypto';

const USER: RoleShape = {
  id: 1,
  uuid: randomUUID(),
  tag: RoleEnum.USER,
  label: 'User',
  description: 'A user',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: new Date().toISOString(),
};

const ADMIN: RoleShape = {
  id: 2,
  uuid: randomUUID(),
  tag: RoleEnum.ADMIN,
  label: 'Admin',
  description: 'An admin',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: new Date().toISOString(),
};

export async function seed(knex: Knex): Promise<void> {
  await knex('roles').del();
  await knex('roles').insert([USER, ADMIN]);
}
