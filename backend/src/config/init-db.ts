import { db } from './db';

async function initDb() {
  try {
    console.log("Verificando estrutura do banco...");

    // 1. Tabela Strains
    const hasStrains = await db.schema.hasTable('Strains');
    if (!hasStrains) {
      await db.schema.createTable('Strains', (table) => {
        table.increments('id').primary();
        table.string('nome');
        table.integer('tempo_flora_estimado');
      });
      console.log("✅ Tabela 'Strains' criada.");
    } else {
      console.log("➡️ Tabela 'Strains' já existe.");
    }

    // 2. Tabela Plantas
    const hasPlantas = await db.schema.hasTable('Plantas');
    if (!hasPlantas) {
      await db.schema.createTable('Plantas', (table) => {
        table.increments('id').primary();
        table.integer('strain_id').references('id').inTable('Strains');
        table.string('identificador');
      });
      console.log("✅ Tabela 'Plantas' criada.");
    } else {
      console.log("➡️ Tabela 'Plantas' já existe.");
    }

    // 3. Tabela Regas
    const hasRegas = await db.schema.hasTable('Regas');
    if (!hasRegas) {
      await db.schema.createTable('Regas', (table) => {
        table.increments('id').primary();
        table.integer('planta_id').references('id').inTable('Plantas');
        table.decimal('nut_base_a_ml');
        table.decimal('nut_base_b_ml');
        table.decimal('nut_base_c_ml');
        table.timestamp('data_hora').defaultTo(db.fn.now());
      });
      console.log("✅ Tabela 'Regas' criada.");
    } else {
      console.log("➡️ Tabela 'Regas' já existe.");
    }

    console.log("🚀 Banco de dados inicializado e pronto para uso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco:", error);
  } finally {
    // Encerra o processo do Node (fundamental para não travar o terminal)
    process.exit(0);
  }
}

initDb();