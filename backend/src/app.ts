import express from 'express';
import cors from 'cors';
import { db } from './config/db';

const app = express();
app.use(cors());

// A mágica que permite o Express ler os dados JSON vindos do Vue
app.use(express.json());

app.post('/api/rega', async (req, res) => {
  try {
    // Desestruturando EXATAMENTE os nomes que vêm no payload do frontend
    const { 
      planta_id, 
      volume_agua_l, 
      nut_base_a_ml, 
      nut_base_b_ml, 
      nut_base_c_ml, 
      total_ml, 
      observacoes 
    } = req.body;

    // Inserindo no SQL Server via Knex
    await db('Regas').insert({
      planta_id,
      volume_agua_l,
      nut_base_a_ml,
      nut_base_b_ml,
      nut_base_c_ml,
      total_ml,
      observacoes,
      data_hora: new Date().toISOString()
    });

    res.status(201).json({ success: true, message: 'Rega salva com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar' });
  }
});

app.get('/api/logs', async (req, res) => {
  try {
    const logs = await db('Regas').select('*').orderBy('data_hora', 'desc').limit(30);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});

app.listen(3000, () => console.log('Backend rodando na porta 3000'));