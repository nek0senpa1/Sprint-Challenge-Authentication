// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' }, // change this if you want a different name for the database

    // you say that, instructions.... but I see I already have that file made... you're trying to get me aren't you...
    
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
