import { Injectable } from '@nestjs/common';
import {
    JsonSchemaBasic, SchemaUtility
} from '../../common/utils/schemavalid';
@Injectable()
export class UserGuard {
    public isPostLogin(params: any): boolean {
        const schema: JsonSchemaBasic = {
          $id: `rest-${UserGuard.name}.${this.isPostLogin.name}`,
          type: 'object',
          properties: {
            userName: {
              type: 'string',
              minLength: 6,
              maxLength: 45,
            },
            password: {
              type: 'string',
              minLength: 1,
            },
          },
          required: ['userName', 'password'],
        };
        return SchemaUtility.getSchemaValidator().validate(schema, params);
      }
}
