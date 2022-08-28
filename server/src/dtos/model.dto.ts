import { IModel } from '@/interfaces/model.interface';
import { IsUUID } from 'class-validator';
import { BaseDto } from './base.dto';

export class ModelDto extends BaseDto {
  @IsUUID()
  public readonly uuid: string;

  public constructor(model: IModel) {
    super();

    this.uuid = model.uuid;
  }
}
