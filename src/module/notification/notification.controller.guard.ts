import {
  GetParams,
  GetId,
  GetNotificationsParams,
} from './notification.model.i';
import { Injectable } from '@nestjs/common';
import {
  JsonSchema,
  SchemaValidator,
  SchemaValidatorBasic,
  SchemaUtility,
  SchemaValidatorId,
  JsonSchemaBasic,
} from '../../common/utils/schemavalid';

@Injectable()
export class GuardNotification {
  public isPostBody(params: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${GuardNotification.name}.${this.isPostBody.name}`,
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        timeNotification: {
          format: 'date-time',
          type: 'string',
        },
        eventId: {
          type: 'number',
          minimum: 1,
        },
        eventPath: {
          type: 'string',
          minLength: 1,
        },
        eventStartTime: {
          format: 'date-time',
          type: 'string',
        },
        eventEndTime: {
          format: 'date-time',
          type: 'string',
        },
        userIds: {
          type: 'array',
          items: {
            type: 'integer',
          }
        },
      },
      required: ['eventId', 'timeNotification', 'title','userIds', 'eventStartTime','eventPath'],
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

  public isPutBodyRead(params: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${GuardNotification.name}.${this.isPutBodyRead.name}`,
      type: 'object',
      properties: {
        isRead: {
          type: 'number',
          minLength: 1,
        },
        userId: {
          type: 'number',
          minimum: 1,
        },
        notificationId: {
          type: 'number',
          minimum: 1,
        },
      },
      required: ['isRead', 'userId', 'notificationId'],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, params);
  }

  public isGetNotificationsParams(params: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${GuardNotification.name}.${this.isGetNotificationsParams.name}`,
      type: 'object',
      properties: {
        isRead: {
          type: 'string',
          pattern: '^0$|^1$',
        },
        eventTypeName: {
          type: 'string',
          minLength: 1,
        },
        search: {
          type: 'string',
          minLength: 1,
        },
        sortName: {
          type: 'string',
          pattern:
            '^title$|^status$|^eventTypeName$|^eventStartTime$|^eventEndTime$',
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
