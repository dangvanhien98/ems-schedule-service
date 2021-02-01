import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SchemaUtility } from '../../common/utils/schemavalid/validator';
import { JsonSchemaBasic } from '../../common/utils/schemavalid/validator.i';

@Injectable()
export class EquipmentGuard {
  /** Please use  JsonSchemaBasic to define schema.
   * And SchemaUtility to validate
   */
  public isPostBody(param: any): boolean {
    const schema: JsonSchemaBasic = {
      $id: `rest-${EquipmentGuard.name}.${this.isPostBody.name}`,
      type: 'object',
      properties: {
        startTime: {
          format: 'date-time',
          type: 'string',
        },
        dueTime: {
          format: 'date-time',
          type: 'string',
        },
        equipmentId: {
          type: 'array',
          minLength: 1,
        },
      },
      required: ['startTime', 'dueTime', 'equipmentId'],
    };
    return SchemaUtility.getSchemaValidator().validate(schema, param);
  }
}
