import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/item.routes'; 

export const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', itemRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
