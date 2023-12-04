import express from 'express';
import askRouter from './routes/ask-router';

const app = express();
const PORT = process.env.PORT!;

app.use(express.json());

app.use('/ask', askRouter);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
};