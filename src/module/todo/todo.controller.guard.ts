import { Injectable } from '@nestjs/common';
import { GetId, getParams } from './todo.model.i';
import {
  JsonSchema,
  SchemaValidator,
  SchemaValidatorBasic,
  SchemaUtility,
  SchemaValidatorId,
  JsonSchemaBasic,
} from '../../common/utils/schemavalid';
@Injectable()
export class TodoGuard {
  public isGetPagination(params: getParams): boolean {
    params.pageSize = Number(params.pageSize);
    params.page = Number(params.page);
    const schema: JsonSchema = {
      properties: {
        pageSize: {
          type: 'number',
          minimum: 1,
        },
        page: {
          type: 'number',
          minimum: 1,
        },
        sortName: {
          type: 'string',
          minimum: 1,
        },
        sortBy: {
          type: 'string',
          minimum: 1,
        },
        search: {
          type: 'string',
          minimum: 1,
        },
        dateFrom: {
          format: 'date-time',
          type: 'string',
        },
        dateTo: {
          format: 'date-time',
          type: 'string',
        },
      },
    };
    return SchemaValidator.SchemaValidator(schema, params);
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
  public isPostBody(params: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${TodoGuard.name}.${this.isPostBody.name}`,
      type: 'object',
      properties: {
        todoName: {
          type: 'string',
          minLength: 1,
          maxLength: 45,
        },
        description: {
          type: 'string',
        },
        status: {
          type: 'string',
          minLength: 1,
        },
        deadline: {
          format: 'date-time',
          type: 'string',
        },
        importance: {
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
      },
      required: ['todoName', 'userId'],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, params);
  }
  public isPutBody(params: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${TodoGuard.name}.${this.isPostBody.name}`,
      type: 'object',
      properties: {
        todoName: {
          type: 'string',
          minLength: 1,
          maxLength: 45,
        },
        description: {
          type: 'string',
        },
        status: {
          type: 'string',
          minLength: 1,
        },
        deadline: {
          format: 'date-time',
          type: 'string',
        },
        importance: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['todoName'],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, params);
  }
  public isGetPath(param: string): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${TodoGuard.name}.${this.isGetPath.name}`,
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
}
