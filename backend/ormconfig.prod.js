module.exports = {
  "type": process.env.NODE_ENV === 'prod' ? process.env.DB_TYPE : 'postgres',
  "host": process.env.NODE_ENV === 'prod' ? process.env.DB_HOST : 'localhost',
  "port": process.env.NODE_ENV === 'prod' ? process.env.DB_PORT : 5432,
  "username": process.env.NODE_ENV === 'prod' ? process.env.DB_USER : 'postgres',
  "password": process.env.NODE_ENV === 'prod' ? process.env.DB_PASS : 'postgres',
  "database": process.env.NODE_ENV === 'prod' ? process.env.DB_DB : 'smartroad',
  "entities": process.env.NODE_ENV === 'prod' ? [
    "./build/modules/**/infra/typeorm/entities/*.js"
  ] : [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": process.env.NODE_ENV === 'prod' ? [
    "./build/shared/infra/typeorm/migrations/*.js"
  ] : [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": process.env.NODE_ENV === 'prod' ? {
    "migrationsDir": "./build/shared/infra/typeorm/migrations"
  } : {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
