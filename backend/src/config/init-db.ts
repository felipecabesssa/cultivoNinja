import { db } from './db';

async function initDb() {
  // Criação das tabelas
  await db.schema.createTable('Strains', (table) => {
    table.increments('id').primary();
    table.string('nome');
    table.integer('tempo_flora_estimado');
  });

  await db.schema.createTable('Plantas', (table) => {
    table.increments('id').primary();
    table.integer('strain_id').references('id').inTable('Strains');
    table.string('identificador');
  });

  await db.schema.createTable('Regas', (table) => {
    table.increments('id').primary();
    table.integer('planta_id').references('id').inTable('Plantas');
    table.decimal('nut_base_a_ml');
    table.decimal('nut_base_b_ml');
    table.decimal('nut_base_c_ml');
    table.timestamp('data_hora').defaultTo(db.fn.now());
  });

  console.log("Banco de dados inicializado com sucesso!");
  process.exit(0);
}

initDb();