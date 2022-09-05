import { PermissionGroupDto } from '@/dtos/permission-group/permission-group.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PermissionGroupShape } from '@/models/permission-group.model';
import { PermissionGroupService } from '@/services/permission-group.service';
import { NextFunction, Response } from 'express';
import { BaseController } from './base.controller';

export class PermissionGroupController extends BaseController {
  protected permissionGroupService = new PermissionGroupService();

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const models = await this.permissionGroupService.getOne(uuid);

      res.status(200).json({
        data: PermissionGroupDto.fromModel(models as PermissionGroupShape),
      });
    } catch (err) {
      next(err);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const models = await this.permissionGroupService.getAll();

      res.status(200).json({
        data: PermissionGroupDto.fromModels(models as PermissionGroupShape[]),
      });
    } catch (err) {
      next(err);
    }
  };
}
