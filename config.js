let config = {
  sessionConfig: {
    secret: 'recall',
    name: 'testapp',
    maxAge: 80000
  },
  redisConfig: {
    host: '127.0.0.1',
    port: '6379',
    db: 2
  }
}

module.exports = config;