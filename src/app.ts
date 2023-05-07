import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
const app = express();

// Import Routers
import chainRouter from './routes/chain';
import { createChainApis, createEvmChainProviders } from './utils/apis';

// CORS
app.use(cors({
    origin: ['http://localhost:3000'] // Allow requests localhost:3000
}));

// All the paths
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Routers paths
app.use('/api/:chain', chainRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}....`);
        })
        createChainApis().then(() => {});
        createEvmChainProviders().then(() => {});
    } catch (error) {
        console.log(error);
    }
}
start()
    .then(() => {
        console.log('api created successfully.')
    })
    .catch(() => {
        console.log('api creation failed.')
    })
