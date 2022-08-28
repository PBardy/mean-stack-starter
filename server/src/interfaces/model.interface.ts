export interface IModel {
  id: number;
  uuid: string;
}

export interface ITimeStamps {
  createdAt: string;
  updatedAt: string;
}

export interface ISoftDeletes {
  deletedAt: string;
}
