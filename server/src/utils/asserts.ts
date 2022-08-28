import { BaseDto } from '@/dtos/base.dto';
import { PermissionEnum } from '@/enums/permission.enum';
import { HttpException } from '@/exceptions/HttpException';
import { IHasPermissions } from '@/interfaces/permission.interface';
import { Permission } from '@/models/permission.model';
import { User } from '@/models/user.model';
import { isEmpty } from 'class-validator';
import { Model } from 'objection';

export const assertIsNotEmpty = async (dto: BaseDto): Promise<void> => {
  if (isEmpty(dto)) {
    throw new HttpException(422, 'Invalid request');
  }
};

export const assertModelExists = async (model: Model): Promise<void> => {
  if (isEmpty(model)) {
    throw new HttpException(404, 'Model not found');
  }
};

export const assertModelDoesNotExist = async (model: Model): Promise<void> => {
  if (!isEmpty(model)) {
    throw new HttpException(409, 'Model already exists');
  }
};

export const assertHasPermission = async (userId: number, permissionTag: PermissionEnum): Promise<void> => {
  const user = await User.query().findById(userId).withGraphJoined('permissions');
  await assertModelExists(user);

  const permission = await Permission.query().where('tag', permissionTag).first();
  await assertModelExists(permission);

  const userWithPermssions = user as unknown as User & IHasPermissions;
  const userPermission = userWithPermssions.permissions.find(p => p.id === permission.id);

  if (userPermission == null) {
    throw new HttpException(403, 'This action is forbidden');
  }
};
