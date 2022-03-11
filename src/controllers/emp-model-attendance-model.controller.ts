import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  EmpModel,
  AttendanceModel,
} from '../models';
import {EmpModelRepository} from '../repositories';

export class EmpModelAttendanceModelController {
  constructor(
    @repository(EmpModelRepository) protected empModelRepository: EmpModelRepository,
  ) { }

  @get('/emp-models/{id}/attendance-models', {
    responses: {
      '200': {
        description: 'Array of EmpModel has many AttendanceModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AttendanceModel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AttendanceModel>,
  ): Promise<AttendanceModel[]> {
    return this.empModelRepository.EmpandAttendanceRelation(id).find(filter);
  }

  @post('/emp-models/{id}/attendance-models', {
    responses: {
      '200': {
        description: 'EmpModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(AttendanceModel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EmpModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttendanceModel, {
            title: 'NewAttendanceModelInEmpModel',
            exclude: ['id'],
            optional: ['Employe_id']
          }),
        },
      },
    }) attendanceModel: Omit<AttendanceModel, 'id'>,
  ): Promise<AttendanceModel> {
    return this.empModelRepository.EmpandAttendanceRelation(id).create(attendanceModel);
  }

  @patch('/emp-models/{id}/attendance-models', {
    responses: {
      '200': {
        description: 'EmpModel.AttendanceModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttendanceModel, {partial: true}),
        },
      },
    })
    attendanceModel: Partial<AttendanceModel>,
    @param.query.object('where', getWhereSchemaFor(AttendanceModel)) where?: Where<AttendanceModel>,
  ): Promise<Count> {
    return this.empModelRepository.EmpandAttendanceRelation(id).patch(attendanceModel, where);
  }

  @del('/emp-models/{id}/attendance-models', {
    responses: {
      '200': {
        description: 'EmpModel.AttendanceModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AttendanceModel)) where?: Where<AttendanceModel>,
  ): Promise<Count> {
    return this.empModelRepository.EmpandAttendanceRelation(id).delete(where);
  }
}
