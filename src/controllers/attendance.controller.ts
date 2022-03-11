import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AttendanceModel} from '../models';
import {AttendanceModelRepository} from '../repositories';

export class AttendanceController {
  constructor(
    @repository(AttendanceModelRepository)
    public attendanceModelRepository : AttendanceModelRepository,
  ) {}

  @post('/attendance-models')
  @response(200, {
    description: 'AttendanceModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(AttendanceModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttendanceModel, {
            title: 'NewAttendanceModel',
            exclude: ['id'],
          }),
        },
      },
    })
    attendanceModel: Omit<AttendanceModel, 'id'>,
  ): Promise<AttendanceModel> {
    return this.attendanceModelRepository.create(attendanceModel);
  }

  @get('/attendance-models/count')
  @response(200, {
    description: 'AttendanceModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AttendanceModel) where?: Where<AttendanceModel>,
  ): Promise<Count> {
    return this.attendanceModelRepository.count(where);
  }

  @get('/attendance-models')
  @response(200, {
    description: 'Array of AttendanceModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AttendanceModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AttendanceModel) filter?: Filter<AttendanceModel>,
  ): Promise<AttendanceModel[]> {
    return this.attendanceModelRepository.find(filter);
  }

  @patch('/attendance-models')
  @response(200, {
    description: 'AttendanceModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttendanceModel, {partial: true}),
        },
      },
    })
    attendanceModel: AttendanceModel,
    @param.where(AttendanceModel) where?: Where<AttendanceModel>,
  ): Promise<Count> {
    return this.attendanceModelRepository.updateAll(attendanceModel, where);
  }

  @get('/attendance-models/{id}')
  @response(200, {
    description: 'AttendanceModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AttendanceModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    //@param.path.number ('employe_id') employe_id: number,
    @param.filter(AttendanceModel, {exclude: 'where'}) filter?: FilterExcludingWhere<AttendanceModel>
  ): Promise<AttendanceModel> {
    return this.attendanceModelRepository.findById(id, filter);
  }

  @patch('/attendance-models/{id}')
  @response(204, {
    description: 'AttendanceModel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttendanceModel, {partial: true}),
        },
      },
    })
    attendanceModel: AttendanceModel,
  ): Promise<void> {
    await this.attendanceModelRepository.updateById(id, attendanceModel);
  }

  @put('/attendance-models/{id}')
  @response(204, {
    description: 'AttendanceModel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() attendanceModel: AttendanceModel,
  ): Promise<void> {
    await this.attendanceModelRepository.replaceById(id, attendanceModel);
  }

  @del('/attendance-models/{id}')
  @response(204, {
    description: 'AttendanceModel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.attendanceModelRepository.deleteById(id);
  }
  
}

export class Applyleave {
  constructor(
    @repository(AttendanceModelRepository)
    public attendanceModelRepository : AttendanceModelRepository,
  ) {}
  @post('/applyleave')
  @response(200, {
    description: 'AttendanceModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(AttendanceModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttendanceModel, {
            title: 'applyleave',
            exclude: ['id'],
          }),
        },
      },
    })
    attendanceModelNew: Omit<AttendanceModel, 'id'>,
  ): Promise<AttendanceModel> {
    return this.attendanceModelRepository.create(attendanceModelNew);
  }
  @get('/apply leave/{Employe_id}')
    @response(200, {
      description: 'AttendanceModel model instance',
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttendanceModel, {includeRelations: true}),
        },
      },
    })
    async findById(
      @param.path.number('Employe_id') Employe_id: number,
      @param.path.string('date') date:string,
      @param.filter(AttendanceModel, {exclude: 'where'}) filter?: FilterExcludingWhere<AttendanceModel>
    ): Promise<AttendanceModel> {
      return this.attendanceModelRepository.findById(Employe_id,filter);
    } 
}
 