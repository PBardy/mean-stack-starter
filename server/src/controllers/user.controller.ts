import { CreateUserDto } from '@/dtos/user/create-user.dto';
import { UserDto } from '@/dtos/user/user.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserShape } from '@/models/user.model';
import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
  protected userService = new UserService();

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAll();

      res.status(200).json({
        data: UserDto.fromModels(users as UserShape[]),
      });
    } catch (err) {
      next(err);
    }
  };

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const user = await this.userService.getByUuid(uuid);

      res.status(200).json({
        data: UserDto.fromModel(user as UserShape),
      });
    } catch (err) {
      next(err);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = CreateUserDto.fromJson(req.body);
      const user = await this.userService.createOne(body);

      res.status(200).json({
        data: UserDto.fromModel(user as UserShape),
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const user = await this.userService.deleteOne(uuid);

      res.status(200).json({
        data: UserDto.fromModel(user as UserShape),
      });
    } catch (err) {
      next(err);
    }
  };
}
