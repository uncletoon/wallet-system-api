class SqlCompiler {
  static compilerSelect(state) {
    let sql = `SELECT ${state.fields.join(", ")} FROM ${state.table}`;
    const values = [];

    if (state.where && state.where.length > 0) {
      const conditions = state.where.map((condition, index) => {
        values.push(condition.value);
        return `${condition.field} ${condition.operator} $${index + 1}`;
      });

      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    if (state.orderBy && state.orderBy.length > 0) {
      const order = state.orderBy.map(o => `${o.field} ${o.direction}`).join(", ");
      sql += ` ORDER BY ${order}`;
    }

    if (state.limit !== null && state.limit !== undefined) {
      sql += ` LIMIT ${state.limit}`;
    }

    if (state.offset !== null && state.offset !== undefined) {
      sql += ` OFFSET ${state.offset}`;
    }

    return { sql, values };
  }

  static compilerInsert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = keys.map((_, i) => `$${i + 1}`);
    const sql = `
    INSERT INTO ${table} (${keys.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
    `;
    return {sql, values};
  }

  static compilerDelete(state) {
    const table = state.table;
    const values = [];

    let sql = `DELETE FROM ${table}`;

    if (state.where && state.where.length > 0) {
      const conditions = state.where.map((condition, index) => {
        values.push(condition.value);
        return `${condition.field} ${condition.operator} $${index + 1}`;
      });

      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += ` RETURNING *`;
    return { sql, values };
  }

  static compilerUpdate(table, data, id) {
   const keys = Object.keys(data);
   const values = Object.values(data); 

   const setKeys = keys.map((k, i) => `${k} = $${i + 1}`);
   const sql = `
   UPDATE ${table}
   SET ${setKeys.join(', ')}
   WHERE id = $${keys.length + 1}
   RETURNING *
   `
    // append id as the last parameter
    values.push(id);
    return {sql, values}

  }

}
module.exports = SqlCompiler;
