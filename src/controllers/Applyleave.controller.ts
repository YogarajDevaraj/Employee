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

import { AttendanceController } from "../controllers";

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
      @param.filter(AttendanceModel, {exclude: 'where'}) filter?: FilterExcludingWhere<AttendanceModel>
    ): Promise<AttendanceModel> {
      return this.attendanceModelRepository.findById(Employe_id, filter);
    }
  }
  
  