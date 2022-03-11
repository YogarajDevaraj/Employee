import {Entity, model, property} from '@loopback/repository';

@model()
export class AttendanceModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  
  @property({
    type: 'number',
    required: true,
  })
  Employe_id: number;

  @property({
    type: 'string',
    required: true,
  })
  Date: string;

  @property({
    type: 'number',
    required: true,
  })
  Log_hours: number;

  @property({
    type: 'boolean',
    required: true,
  })
  IsExtraTime: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isleave: boolean;

  @property({
    type: 'boolean',
    //required: true,
    default: false
  })
  IsDeleted: boolean;


  constructor(data?: Partial<AttendanceModel>) {
    super(data);
  }
}

export interface AttendanceModelRelations {
  // describe navigational properties here
}

export type AttendanceModelWithRelations = AttendanceModel;
