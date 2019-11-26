export const config = {
    development: {      
      connection: "mongodb://mongo:27017/mongo-dev"
    },
    test: {      
      connection: "mongodb://mongo:27017/mongo-test"
    },
    production: {      
      connection: process.env.DATABASE_URL
    }
  };