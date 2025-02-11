/**
 * * common services here
 * * can import from any existing service, export, and use!
 */

/**
 * * gets redis string and convert to json
 */
const getCache = async (app, key) => {
  const data = await app.redis.get(key)
  return data ? JSON.parse(data) : false
}

/**
 * * https://stackoverflow.com/questions/35968537/ioredis-delete-all-keys-by-pattern
 * * stream and scan for large number of keys
 */
const removeCache = async (app, pattern) => {
  var stream = app.redis.scanStream({
    match: pattern
  })

  stream.on('data', function (keys) {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      var pipeline = app.redis.pipeline()

      keys.forEach(function (key) {
        pipeline.del(key)
      })
      pipeline.exec()
    }
  })
  stream.on('end', function () {
    app.log.info(`Cache cleared on: ${pattern}`)
  })
}

/**
 * Pagination function decorated in knex plugin
 * @param {*} knex
 * @param {string} props { per_page, current_page, table, query, sort }
 * @returns pagination
 */
const paginate = async (knex, props) => {
  var pagination = {}
  var per_page = props.per_page || 20
  var page = props.current_page || 1
  var sort = props.orderBy || 'desc'

  if (page < 1) page = 1

  var offset = (page - 1) * per_page

  const data_query = props.query
    ? props.query.offset(offset).limit(per_page)
    : knex(props.table).orderBy('id', sort).offset(offset).limit(per_page)

  const [total, rows] = await Promise.all([
    knex(props.table).count('* as count').first(),
    data_query
  ])

  pagination.total = props.query ? rows.length : total.count
  pagination.per_page = per_page
  pagination.offset = offset
  pagination.to = offset + rows.length
  pagination.last_page = Math.ceil(total.count / per_page)
  pagination.current_page = page
  pagination.from = offset
  pagination.data = rows
  return pagination
}

module.exports = { getCache, removeCache, paginate }
