import express from 'express';
// import path from 'path';
import askRouter from './routes/ask-router';
import authRouter from './routes/auth-routes';

const app = express();
const PORT = process.env.PORT!;

app.use(express.json());
// app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', authRouter);
app.use('/ask', askRouter);

export const startServer = () => {
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });
};