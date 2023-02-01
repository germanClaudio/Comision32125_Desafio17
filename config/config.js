const options = {
    mysql: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'products'
    }
  },

  mongoDB: {
    connection: {
      URL: process.env.MONGO_URL_CONNECT_ECOM
    },
  },

  filePath: {
    path: './DB/productos.json',
    pathMsg: './DB/messages.json'
  },

  sqlite: {
    client: 'sqlite3',
    connection: {
    filePath: './DB/messages.json'
    },
    useNullAsDefault: true
  },
  
  HOST: process.env.HOST || 'localhost'
}

  module.exports = {
    options
  }