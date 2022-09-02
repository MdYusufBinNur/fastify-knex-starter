/**
 * * common services here
 * * can import from any existing service, export, and use!
 */

/**
 * * gets redis string and convert to json
 */
const getCache = async (app, key) => {
  const data = await app.redis.get(key, (error, value) => {
    if (error) app.log.warn(error)
    if (value != null) {
      return value
    }
  })

  if (data != null) {
    return JSON.parse(data)
  } else {
    return false
  }
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
    app.log.info('cache cleared')
  })
}

const paginate = (app, props) => {
  var pagination = {}
  var per_page = props.per_page || 10
  var page = props.current_page || 1

  if (page < 1) page = 1

  var offset = (page - 1) * per_page

  return Promise.all([
    app.knex.count('* as count').from(props.table).first(),
    app.knex(props.table).offset(offset).limit(per_page)
  ]).then(([total, rows]) => {
    var count = total.count
    var rows = rows

    pagination.total = count
    pagination.per_page = per_page
    pagination.offset = offset
    pagination.to = offset + rows.length
    pagination.last_page = Math.ceil(count / per_page)
    pagination.current_page = page
    pagination.from = offset
    pagination.data = rows

    return pagination
  })
}

module.exports = { getCache, removeCache, paginate }
