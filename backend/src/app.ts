import express from 'express';
import cors from 'cors';
import { db } from './config/db';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/rega', async (req, res) => {
  try {
    const { dosagemA, dosagemB, dosagemC, total_ml, observacoes } = req.body;
    await db('Regas').insert({
      nut_base_a_ml: dosagemA,
      nut_base_b_ml: dosagemB,
      nut_base_c_ml: dosagemC,
      total_ml: total_ml,
      observacoes: observacoes,
      data_hora: new Date().toISOString()
    });
    res.json({ success: true });
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