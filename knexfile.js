// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      port: 5432,
      user: "postgres",
      password: "stretchtech",
      database: "bare-minimum"
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    // connection: {
    //   database: 'my_db',
    //   user:     'username',
    //   password: 'password'
    // },
    connection: {
      connectionString: process.env.DATABSE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
