const PaginatePlugin = (schema, options) => {
    options = options || {}
    schema.query.paginate = async function(params) {
      const pagination = {
        size: options.size || 10,
        page: 1,
        count: 0
      }
      pagination.size = parseInt(params.size) || pagination.size
      const page = parseInt(params.page)
      pagination.page = page > 0 ? page : pagination.page
      const offset = (pagination.page - 1) * pagination.size
  
      const [data, count] = await Promise.all([
        this.limit(pagination.size).skip(offset),
        this.model.countDocuments(this.getQuery())
      ]);
      pagination.count = count;
      return { data, pagination }
    }
  }

  module.exports = PaginatePlugin