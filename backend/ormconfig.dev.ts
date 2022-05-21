export default {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "smartroad",
  "entities": [
    "./build/modules/**/infra/typeorm/entities/*.js"
  ],
  "migrations": [
    "./build/shared/infra/typeorm/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./build/shared/infra/typeorm/migrations"
  }
}
