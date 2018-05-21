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
  },
  sqlConfig: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'chat'
  }
}

module.exports = config;