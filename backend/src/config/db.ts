import knex from 'knex';

export const db = knex({
  client: 'mssql',
  connection: {
    host: '127.0.0.1',
    user: 'sa',
    password: 'Vodk@6669',
    database: 'CultivoNinjaDB',
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }
});