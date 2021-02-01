export class TodoListDecorator {
  convertFilter(field: string) {
    let a: string[] = [];
    a = field.toString().split(',');
    return a;
  }

  stringSqlOrderBy(sortName: string, sortBy: string) {
    const fieldName = [
      'todoId',
      'todoName',
      'status',
      'description',
      'deadline',
      'importance',
      'userId',
      'todoCategoryId',
      'todoCategoryName',
      'created',
      'modified',
    ];
    const sortType = ['asc', 'desc'];
    let orderby = '';
    if (fieldName.includes(sortName) == true && sortType.includes(sortBy)) {
      if (sortName !== '' && sortBy !== '')
        orderby = orderby + 'order by ' + sortName + ' ' + sortBy;
    }
    return orderby;
  }
  stringSqlFilter(field: string, content: string[]) {
    let filterSql = '';
    if (content[0] === '') return filterSql;
    if (content != []) {
      filterSql += ' and ( ';
      for (var i = 0; i < content.length; i++) {
        filterSql = filterSql + 'td.' + field + " = '" + content[i] + "'";
        if (i < content.length - 1) filterSql += ' or ';
      }
      filterSql += ')';
    }
    return filterSql;
  }

  stringSqlFilterDate(dateFrom: Date, dateTo: Date) {
    let dateSql = '';
    if (dateFrom != null && dateTo != null) {
      if (dateFrom.toString() == '' && dateTo.toString() == '') return dateSql;
      if (dateFrom.toString() == '' && dateTo.toString() != '')
        return (dateSql = dateSql + 'and deadline <= ' + "'" + dateTo + "'");
      if (dateFrom.toString() != '' && dateTo.toString() == '')
        return (dateSql = dateSql + 'and deadline >= ' + "'" + dateFrom + "'");
      if (dateFrom.toString() != '' && dateTo.toString() != '')
        return (dateSql =
          dateSql +
          'and deadline between ' +
          "'" +
          dateFrom +
          "'" +
          ' and ' +
          "'" +
          dateTo +
          "'");
    }
    if (dateFrom == null && dateTo != null && dateTo.toString() != '')
      dateSql = dateSql + 'and deadline <= ' + "'" + dateTo + "'";
    else if (dateTo == null && dateFrom != null && dateFrom.toString() != '')
      dateSql = dateSql + 'and deadline >= ' + "'" + dateFrom + "'";
    else if (dateFrom != null && dateTo != null)
      dateSql =
        dateSql +
        'and deadline between ' +
        "'" +
        dateFrom +
        "'" +
        ' and ' +
        "'" +
        dateTo +
        "'";

    return dateSql;
  }
}
