import { Knex } from 'knex';
import { randomUUID } from 'crypto';
import { PermissionGroupEnum } from '../../enums/permission-group.enum';
import { PermissionGroupShape } from '../../models/permission-group.model';

const VIEW_SELF: PermissionGroupShape = {
  id: 1,
  uuid: randomUUID(),
  tag: PermissionGroupEnum.VIEW_SELF,
  label: 'View Self',
  description: 'Allow user to view any model that they own',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const EDIT_SELF: PermissionGroupShape = {
  id: 2,
  uuid: randomUUID(),
  tag: PermissionGroupEnum.EDIT_SELF,
  label: 'Edit Self',
  description: 'Allow a user to edit any model that they own',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const DELETE_SELF: PermissionGroupShape = {
  id: 3,
  uuid: randomUUID(),
  tag: PermissionGroupEnum.DELETE_SELF,
  label: 'Delete Self',
  description: 'Allow a user to delete any model they own',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const VIEW_ALL: PermissionGroupShape = {
  id: 4,
  uuid: randomUUID(),
  tag: PermissionGroupEnum.VIEW_ALL,
  label: 'View All',
  description: 'Allow user to view any model',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const EDIT_ALL: PermissionGroupShape = {
  id: 5,
  uuid: randomUUID(),
  tag: PermissionGroupEnum.EDIT_ALL,
  label: 'Edit All',
  description: 'Allow a user to edit any model',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const DELETE_ALL: PermissionGroupShape = {
  id: 6,
  uuid: randomUUID(),
  tag: PermissionGroupEnum.DELETE_ALL,
  label: 'Delete All',
  description: 'Allow a user to delete any model',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

export async function seed(knex: Knex): Promise<void> {
  await knex('permission_groups').del();
  await knex('permission_groups').insert([VIEW_ALL, VIEW_SELF, EDIT_ALL, EDIT_SELF, DELETE_SELF, DELETE_ALL]);
}
