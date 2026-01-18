import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/item.routes';
import userRoutes from './routes/user.routes';

export const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', itemRoutes);
app.use("/api/users", userRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
