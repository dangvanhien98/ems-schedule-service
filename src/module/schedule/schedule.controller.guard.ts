import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { exception } from 'console';
import { Observable } from 'rxjs';
import {
  SchemaValidatorId,
  JsonSchema,
  SchemaValidator,
} from '../../common/utils/schemavalid';
import { SchemaUtility } from '../../common/utils/schemavalid/validator';
import { JsonSchemaBasic } from '../../common/utils/schemavalid/validator.i';
import { GetId } from '../todo/todo.model.i';
import { GetAllScheduleParams, GetParamDelete, GetParamListWeek } from './schedule.model.i';

@Injectable()
export class ScheduleGuard {
  /** Please use  JsonSchemaBasic to define schema.
   * And SchemaUtility to validate
   */
  public isGetAllScheduleParams(params: GetAllScheduleParams): boolean {
    if (params.from > params.to) {
      throw new BadRequestException('Error date!');
    }
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isGetAllScheduleParams.name}`,
      type: 'object',
      properties: {
        from: {
          format: 'date-time',
          type: 'string',
        },
        to: {
          format: 'date-time',
          type: 'string',
        },
        keyword: {
          type: 'string',
          minimum: 1,
        },
      },
      required: [],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, params);
  }
  public isValidId(params: GetId): boolean {
    params.id = Number(params.id);
    const schema: JsonSchema = {
      properties: {
        id: {
          type: 'number',
          minimum: 1,
        },
      },
    };
    return SchemaValidatorId.SchemaValidatorId(schema, params);
  }

  public isGetScheduleWeekParams(param: GetParamListWeek):boolean{
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isGetScheduleWeekParams.name}`,
      type: 'object',
      properties: {
        director: {
          type: 'string',
          pattern: '^[0-9]+$',
          minLength: 1,
        },
        page: {
          type: 'string',
          pattern: '^[0-9]+$',
        },
        pageSize: {
          type: 'string',
          pattern: '^[0-9]+$',
        },
        startDate: {
          format: 'date-time',
          type: 'string',
        },
        endDate: {
          format: 'date-time',
          type: 'string',
        },
      },
      required: ['startDate', 'endDate', 'director'],
    }
    return SchemaUtility.getSchemaValidator().validate(schema, param);
  }

  public isPostBody(param: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isPostBody.name}`,
      type: 'object',
      properties: {
        title: {
          type: 'string',
          minLength: 1,
        },
        timeStart: {
          format: 'date-time',
          type: 'string',
        },
        dueDate: {
          format: 'date-time',
          type: 'string',
        },
        createBy: {
          type: 'integer',
          minimum: 1,
        },
        isDelete: {
          type: 'boolean',
        },
        description: {
          type: 'string',
          minLength: 1,
        },
        important: {
          type: 'string',
          minLength: 1,
        },
        place: {
          type: 'string',
          minLength: 1,
        },
        created: {
          format: 'date-time',
          type: 'string',
        },
        modified: {
          format: 'date-time',
          type: 'string',
        },
        timeStartRepeat: {
          format: 'time',
          type: 'string',
        },
        timeDueRepeat: {
          format: 'time',
          type: 'string',
        },
        typeRepeat: {
          type: 'string',
          minLength: 1,
        },
        valueRepeat: {
          type: 'string',
          minLength: 1,
        },
        equipmentName: {
          type: 'array',
          items: {
            equipmentId: { type: 'integer' },
            timeStart: { type: 'string' },
            timeDue: { type: 'string' },
          },
        },
        userIds: {
          type: 'array',
          items: { type: 'integer' },
        },
      },
      required: ['title', 'userIds', 'typeRepeat', 'createBy'],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, param);
  }

  public isPutPath(param: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isPutPath.name}`,
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
      },
      required: ['id'],
    };
    const checkVal = {
      id: Number(param),
    };

    return SchemaUtility.getSchemaValidator().validate(schema, checkVal);
  }

  public isPutBody(param: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isPutBody.name}`,
      type: 'object',
      properties: {
        title: {
          type: 'string',
          minLength: 1,
        },
        timeStart: {
          format: 'date-time',
          type: 'string',
        },
        dueDate: {
          format: 'date-time',
          type: 'string',
        },
        description: {
          type: 'string',
          minLength: 1,
        },
        important: {
          type: 'string',
          minLength: 1,
        },
        place: {
          type: 'string',
          minLength: 1,
        },
        created: {
          format: 'date-time',
          type: 'string',
        },
        modified: {
          format: 'date-time',
          type: 'string',
        },
        timeStartRepeat: {
          format: 'time',
          type: 'string',
        },
        timeDueRepeat: {
          format: 'time',
          type: 'string',
        },
        typeRepeat: {
          type: 'string',
          minLength: 1,
        },
        valueRepeat: {
          type: 'string',
          minLength: 1,
        },
        equipmentName: {
          type: 'array',
          items: {
            equipmentId: { type: 'integer' },
            timeStart: { type: 'string' },
            timeDue: { type: 'string' },
          },
        },
        userIds: {
          type: 'array',
          items: { type: 'integer' },
        },
      },
      required: ['title', 'userIds', 'typeRepeat'],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, param);
  }
  public isGetParamDelete(params: GetParamDelete): boolean {
    params.userId = Number(params.userId);
    params.scheduleId = Number(params.scheduleId);
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isGetParamDelete.name}`,
      type: 'object',
      properties: {
        scheduleId: {
          type: 'number',
          minimum: 1,
        },
      },
      required: ['scheduleId', 'userId'],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, params);
  }

  public isGetPath(param: string): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isPutPath.name}`,
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
      },
      required: ['id'],
    };
    const checkVal = {
      id: Number(param),
    };

    return SchemaUtility.getSchemaValidator().validate(schema, checkVal);
  }

  public isGetScheduleParamsFilter(params: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${ScheduleGuard.name}.${this.isGetScheduleParamsFilter.name}`,
      type: 'object',
      properties: {
        from: {
          format: 'date-time',
          type: 'string',
        },
        to: {
          format: 'date-time',
          type: 'string',
        },
        keyword: {
          type: 'string',
          minimum: 1,
        },
        sortName: {
          type: 'string',
          pattern:
            '^title$|^timeStart$|^dueTime$|^importance$|^place$|^scheduleCategoryName$|^typeRepeat$',
        },
        sortBy: {
          type: 'string',
          pattern: '^asc$|^desc$',
        },
        pageSize: {
          type: 'string',
          pattern: '^[0-9]+$',
          minLength: 1,
        },
        page: {
          type: 'string',
          pattern: '^[0-9]+$',
          minLength: 1,
        },
      },
      required: [],
    };

    return SchemaUtility.getSchemaValidator().validate(schema, params);
  }
}
