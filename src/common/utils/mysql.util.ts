const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, (group: string) =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );
const camelToSnakeCase = (field: string) =>
  field
    .split(/(?=[A-Z])/)
    .map(x => x.toLowerCase())
    .join('_');

/**
 * TODO : Chuyển Object thành String Query MYSQL
 * @param params
 */
function prepareStmtFromObject(params: object) {
  const constraints = [];
  const data = [];
  Object.keys(params).forEach(item => {
    if (!params[item] || params[item] == '') {
      return;
    }
    if (item === '$or') {
      const localConstraints = [];
      Object.keys(params[item]).forEach(value => {
        localConstraints.push(`${camelToSnakeCase(value)} LIKE ?`);
        data.push(`%${params[item][value]}%`);
      });
      constraints.push(`(${localConstraints.join(' OR ')})`);
    }
    if (Array.isArray(params[item])) {
      constraints.push(`${camelToSnakeCase(item)} in (?)`);
      data.push(params[item]);
    } else if (
      typeof params[item] === 'string' &&
      params[item].indexOf(',') > -1
    ) {
      constraints.push(`${item} in (?)`);
      data.push(params[item].split(','));
    } else if (params[item] instanceof RegExp) {
      constraints.push(`${camelToSnakeCase(item)} REGEXP ?`);
      data.push(params[item]);
    } else if (params[item] && typeof params[item] === 'object') {
      Object.keys(params[item]).forEach(value => {
        if (value === '$gte') {
          constraints.push(`${camelToSnakeCase(item)} >= ?`);
          data.push(params[item][value]);
        } else if (value === '$lte') {
          constraints.push(`${camelToSnakeCase(item)} <= ?`);
          data.push(params[item][value]);
        } else if (value === '$gt') {
          constraints.push(`${camelToSnakeCase(item)} > ?`);
          data.push(params[item][value]);
        } else if (value === '$lt') {
          constraints.push(`${camelToSnakeCase(item)} < ?`);
          data.push(params[item][value]);
        } else if (value === '$like') {
          if (Array.isArray(params[item][value])) {
            const localConstraints = [];
            params[item][value].forEach(likeValues => {
              localConstraints.push(`${camelToSnakeCase(item)} LIKE ?`);
              data.push(`%${likeValues}%`);
            });
            constraints.push(`(${localConstraints.join(' OR ')})`);
          } else if (
            typeof params[item][value] === 'string' &&
            params[item][value].indexOf(',') > -1
          ) {
            const localConstraints = [];
            params[item][value] = params[item][value].split(',');
            params[item][value].forEach(likeValues => {
              localConstraints.push(`${camelToSnakeCase(item)} LIKE ?`);
              data.push(`%${likeValues}%`);
            });
            constraints.push(`(${localConstraints.join(' OR ')})`);
          } else {
            constraints.push(`${camelToSnakeCase(item)} LIKE ?`);
            data.push(`%${params[item][value]}%`);
          }
        }
      });
    } else {
      constraints.push(`${camelToSnakeCase(item)} = ?`);
      data.push(params[item]);
    }
  });
  return { constraints, data };
}

export default prepareStmtFromObject;
