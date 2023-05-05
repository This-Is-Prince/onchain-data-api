import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

// Import Routers
import heightRouter from './routes/height';
import { createChainApis } from './utils/apis';

// All the paths
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Routers paths
app.use('/api/:chain', heightRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await createChainApis();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}....`);
        })
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
