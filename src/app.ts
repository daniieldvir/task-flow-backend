import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/item.routes';

export const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

// כל ה-API שלנו נמצא תחת /api
app.use('/api', itemRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
