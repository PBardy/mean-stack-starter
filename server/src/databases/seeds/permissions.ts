import { PermissionEnum } from '../../enums/permission.enum';
import { PermissionsShape } from '@/models/permission.model';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';

const VIEW_SELF: PermissionsShape = {
  id: 1,
  uuid: randomUUID(),
  tag: PermissionEnum.VIEW_SELF,
  label: 'View Self',
  description: 'Allow a user to view their own account info',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const VIEW_USER: PermissionsShape = {
  id: 2,
  uuid: randomUUID(),
  tag: PermissionEnum.VIEW_USER,
  label: 'View User',
  description: 'Allow a user to view any other users account info',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const VIEW_USERS: PermissionsShape = {
  id: 3,
  uuid: randomUUID(),
  tag: PermissionEnum.VIEW_USERS,
  label: 'View Users',
  description: 'Allow a user to view all users',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const VIEW_PERMISSIONS: PermissionsShape = {
  id: 4,
  uuid: randomUUID(),
  tag: PermissionEnum.VIEW_PERMISSIONS,
  label: 'View Permissions',
  description: 'Allow a user to view all permissions',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const EDIT_SELF: PermissionsShape = {
  id: 5,
  uuid: randomUUID(),
  tag: PermissionEnum.EDIT_SELF,
  label: 'Edit Self',
  description: 'Allow a user to edit their account',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const EDIT_USER: PermissionsShape = {
  id: 6,
  uuid: randomUUID(),
  tag: PermissionEnum.EDIT_USER,
  label: 'Edit User',
  description: 'Allow a user to edit another user',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const EDIT_PERMISSIONS: PermissionsShape = {
  id: 7,
  uuid: randomUUID(),
  tag: PermissionEnum.EDIT_PERMISSIONS,
  label: 'Edit Permissions',
  description: 'Allow a user to edit non-protected permissions',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const DELETE_SELF: PermissionsShape = {
  id: 8,
  uuid: randomUUID(),
  tag: PermissionEnum.DELETE_SELF,
  label: 'Delete Self',
  description: 'Allow a user to delete their own account',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const DELETE_USER: PermissionsShape = {
  id: 9,
  uuid: randomUUID(),
  tag: PermissionEnum.DELETE_USER,
  label: 'Delete User',
  description: 'Allow a user to delete another user',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

const DELETE_PERMISSIONS: PermissionsShape = {
  id: 10,
  uuid: randomUUID(),
  tag: PermissionEnum.DELETE_PERMISSIONS,
  label: 'Delete Permissions',
  description: 'Allow a user to delete non-protected permissions',
  protected: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
};

export async function seed(knex: Knex): Promise<void> {
  await knex('permissions').del();
  await knex('permissions').insert([
    VIEW_SELF,
    VIEW_USER,
    VIEW_USERS,
    VIEW_PERMISSIONS,
    EDIT_SELF,
    EDIT_USER,
    EDIT_PERMISSIONS,
    DELETE_SELF,
    DELETE_USER,
    DELETE_PERMISSIONS,
  ]);
}
