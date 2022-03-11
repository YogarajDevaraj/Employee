import {Entity, model, property, hasMany} from '@loopback/repository';
import {AttendanceModel} from './attendance-model.model';

@model()
export class EmpModel extends Entity {
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
  Employee_id: number;

  @property({
    type: 'string',
    required: true,
  })
  Employee_Name: string;

  @property({
    type: 'number',
    required: true,
  })
  Employee_Salary: number;

  @property({
    type: 'number',
  })
  Phone_Number?: number;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;

  @property({
    type: 'string',
    required: true,
  })
  Professional_Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Personal_Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Designation: string;

  @property({
    type: 'string',
    required: true,
  })
  Joining_Date: string;

  @property({
    type: 'string',
    required: true,
  })
  DOB: string;

  @property({
    type: 'string',
    required: true,
  })
  Blood_Group: string;

  @hasMany(() => AttendanceModel, {keyTo: 'Employe_id'})
  EmpandAttendanceRelation: AttendanceModel[];

  constructor(data?: Partial<EmpModel>) {
    super(data);
  }
}

export interface EmpModelRelations {
  // describe navigational properties here
}

export type EmpModelWithRelations = EmpModel;
