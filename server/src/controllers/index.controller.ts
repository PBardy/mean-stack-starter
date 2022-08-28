import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';

export class IndexController extends BaseController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
