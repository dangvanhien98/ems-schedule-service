import { MessageErrorConstant } from './../constants/messageErrorConstant';
import * as lodash from 'lodash';
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
export enum EQueryParamsField {
  Page = 'page',
  PerPage = 'pageSize',
  Sort = 'sort',
  Date = 'date',
  Search = 'search',
  Origin = 'origin',
  SortName = 'sortName',
  SortBy = 'sortBy',
}
export interface QueryParamsConfig {
  [key: string]: string | number | boolean | Date | RegExp | QueryParamsConfig;
}

export interface QueryParamsResult {
  queries: QueryParamsConfig;
  options: QueryParamsConfig;
  params: QueryParamsConfig;
  origin: QueryParamsConfig;
  request: any;
}

interface TransformConfigObject {
  [key: string]: string | number | boolean;
}
export type TransformConfig =
  | EQueryParamsField
  | string
  | TransformConfigObject;
interface ValidateError {
  name: string;
  field: EQueryParamsField;
  isAllowed: boolean;
  isIllegal: boolean;
  setValue(): void;
}

export const QueryParams = createParamDecorator(
  (
    customConfig: TransformConfig[],
    ctx: ExecutionContext,
  ): QueryParamsResult => {
    const request = ctx.switchToHttp().getRequest();
    const transformConfig: QueryParamsConfig = {
      [EQueryParamsField.Page]: 1,
      [EQueryParamsField.PerPage]: true,
      [EQueryParamsField.Sort]: true,
      [EQueryParamsField.SortBy]: true,
      [EQueryParamsField.SortName]: true,
    };
    if (customConfig) {
      customConfig.forEach(field => {
        if (lodash.isString(field)) {
          transformConfig[`${field}`] = true;
        }
        if (lodash.isObject(field)) {
          Object.assign(transformConfig, field);
        }
      });
    }

    const queries: QueryParamsConfig = {};

    const options: QueryParamsConfig = {};

    const params: QueryParamsConfig = lodash.merge(
      { url: request.url },
      request.params,
    );

    const [page, pageSize, origin, sort, date, sortName, sortBy] = [
      request.query.page
        ? Number(request.query.page)
        : request.query.page || Number(transformConfig.page),
      request.query.pageSize
        ? Number(request.query.pageSize)
        : request.query.pageSize,
      request.query.origin,
      request.query.sort ? String(request.query.sort) : request.query.sort,
      request.query.date,
      request.query.sortName,
      request.query.sortBy,
    ].map(item => {
      if (item !== null && item !== undefined) {
        return item;
      }
    });
    /**
     * Sort Split
     */
    let sortString =
      sort &&
      sort
        .split(',')
        .map(rs => {
          let field = rs.split(':')[0];
          if (!customConfig.includes(field.toString()))
            throw new BadRequestException('Tham số không hợp lệ：' + field);
          if (!['desc', 'asc'].includes(rs.split(':')[1]))
            throw new BadRequestException('Tham số không hợp lệ：' + field);
          return rs.split(':').join(' ');
        })
        .join(',');
    // const regexSort = /([\w+]+=(asc|desc))(,([\w+]+=(asc|desc)))*/gm;
    const validates: ValidateError[] = [
      {
        name: 'sort',
        field: EQueryParamsField.Sort,
        isAllowed: true,
        isIllegal: false,
        setValue() {
          options.sort = sortString;
        },
      },
      {
        name: 'page',
        field: EQueryParamsField.Page,
        isAllowed:
          lodash.isUndefined(page) ||
          (lodash.isInteger(page) && Number(page) > 0),
        isIllegal: false,
        setValue() {
          if (page != null) {
            options.page = page;
          }
        },
      },
      {
        name: 'pageSize',
        field: EQueryParamsField.PerPage,
        isAllowed:
          lodash.isUndefined(pageSize) ||
          (lodash.isInteger(pageSize) && Number(pageSize) > 0),
        isIllegal: false,
        setValue() {
          if (pageSize != null) {
            options.pageSize = pageSize;
          } else {
            options.pageSize = 20; // default
          }
        },
      },
      {
        name: 'date',
        field: EQueryParamsField.Date,
        isAllowed:
          lodash.isUndefined(date) ||
          new Date(date).toString() !== 'Invalid Date',
        isIllegal: false,
        setValue() {
          if (date != null) {
            const queryDate = new Date(date);
            queries.created = {
              $gte: new Date(((queryDate as any) / 1000 - 60 * 60 * 8) * 1000),
              $lt: new Date(((queryDate as any) / 1000 + 60 * 60 * 16) * 1000),
            };
          }
        },
      },
      {
        name: 'origin',
        field: EQueryParamsField.Origin,
        isAllowed: lodash.isUndefined(origin),
        isIllegal: false,
        setValue() {
          if (origin != null) {
            queries.origin = origin;
          }
        },
      },
      {
        name: 'sortName',
        field: EQueryParamsField.SortName,
        isAllowed:
          lodash.isUndefined(sortName) || customConfig.includes(sortName),
        isIllegal: false,
        setValue() {
          options.sortName = sortName;
        },
      },
      {
        name: 'sortBy',
        field: EQueryParamsField.SortBy,
        isAllowed:
          lodash.isUndefined(sortBy) || ['desc', 'asc'].includes(sortBy),
        isIllegal: false,
        setValue() {
          options.sortBy = sortBy;
        },
      },
    ];

    const isEnableField = field => field != null && field !== false;

    /**
     * TODO: Kiểm tra tham số truyền vào url
     * isAllowed = true
     */
    validates.forEach(validate => {
      if (!isEnableField(transformConfig[validate.field])) {
        return false;
      }
      if (!validate.isAllowed) {
        throw new BadRequestException(
          MessageErrorConstant.INVALID_PARAMETER + ': ' + validate.name,
        );
      }
      if (validate.isIllegal) {
        throw new ForbiddenException(
          MessageErrorConstant.NO_PERMISSION + ': ' + validate.name,
        );
      }
      validate.setValue();
    });

    const isProcessedFields = validates.map(validate => validate.field);
    const allAllowFields = Object.keys(transformConfig);
    const todoFields = lodash.difference(allAllowFields, isProcessedFields);
    todoFields.forEach(field => {
      const targetValue = request.query[field];
      if (targetValue != null) queries[field] = targetValue;
    });

    request.queryParams = { queries, options, params };

    const result = {
      queries,
      options,
      params,
      request,
      origin: request.query,
    };
    return result;
  },
);
