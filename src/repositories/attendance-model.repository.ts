import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {AttendanceModel, AttendanceModelRelations} from '../models';

export class AttendanceModelRepository extends DefaultCrudRepository<
  AttendanceModel,
  //typeof AttendanceModel.prototype.id,
  typeof AttendanceModel.prototype.id,

  AttendanceModelRelations
> {
  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource,
  ) {
    super(AttendanceModel, dataSource);
  }
}
