import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {EmpModel, EmpModelRelations, AttendanceModel} from '../models';
import {AttendanceModelRepository} from './attendance-model.repository';

export class EmpModelRepository extends DefaultCrudRepository<
  EmpModel,
  typeof EmpModel.prototype.id,
  EmpModelRelations
> {

  public readonly EmpandAttendanceRelation: HasManyRepositoryFactory<AttendanceModel, typeof EmpModel.prototype.id>;

  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource, @repository.getter('AttendanceModelRepository') protected attendanceModelRepositoryGetter: Getter<AttendanceModelRepository>,
  ) {
    super(EmpModel, dataSource);
    this.EmpandAttendanceRelation = this.createHasManyRepositoryFactoryFor('EmpandAttendanceRelation', attendanceModelRepositoryGetter,);
    this.registerInclusionResolver('EmpandAttendanceRelation', this.EmpandAttendanceRelation.inclusionResolver);
  }
}
