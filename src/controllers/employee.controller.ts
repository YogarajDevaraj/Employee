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
import {EmpModel} from '../models';
import {EmpModelRepository} from '../repositories';

export class EmployeeController {
  constructor(
    @repository(EmpModelRepository)
    public empModelRepository : EmpModelRepository,
  ) {}

  @post('/emp-models')
  @response(200, {
    description: 'EmpModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmpModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpModel, {
            title: 'NewEmpModel',
            exclude: ['id'],
          }),
        },
      },
    })
    empModel: Omit<EmpModel, 'id'>,
  ): Promise<EmpModel> {
    return this.empModelRepository.create(empModel);
  }

  @get('/emp-models/count')
  @response(200, {
    description: 'EmpModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmpModel) where?: Where<EmpModel>,
  ): Promise<Count> {
    return this.empModelRepository.count(where);
  }

  @get('/emp-models')
  @response(200, {
    description: 'Array of EmpModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmpModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmpModel) filter?: Filter<EmpModel>,
  ): Promise<EmpModel[]> {
    return this.empModelRepository.find(filter);
  }

  @patch('/emp-models')
  @response(200, {
    description: 'EmpModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpModel, {partial: true}),
        },
      },
    })
    empModel: EmpModel,
    @param.where(EmpModel) where?: Where<EmpModel>,
  ): Promise<Count> {
    return this.empModelRepository.updateAll(empModel, where);
  }

  @get('/emp-models/{id}')
  @response(200, {
    description: 'EmpModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmpModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EmpModel, {exclude: 'where'}) filter?: FilterExcludingWhere<EmpModel>
  ): Promise<EmpModel> {
    return this.empModelRepository.findById(id, filter);
  }

  @patch('/emp-models/{id}')
  @response(204, {
    description: 'EmpModel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpModel, {partial: true}),
        },
      },
    })
    empModel: EmpModel,
  ): Promise<void> {
    await this.empModelRepository.updateById(id, empModel);
  }

  @put('/emp-models/{id}')
  @response(204, {
    description: 'EmpModel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empModel: EmpModel,
  ): Promise<void> {
    await this.empModelRepository.replaceById(id, empModel);
  }

  @del('/emp-models/{id}')
  @response(204, {
    description: 'EmpModel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empModelRepository.deleteById(id);
  }
}
