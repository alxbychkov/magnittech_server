import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { TaskController } from './controllers/index.js';

const MONGO_URI = process.env.MONGO_URI;

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({extended: true}));

app.use(cors());

app.get('/task', TaskController.load);
app.post('/task', TaskController.create);
app.put('/task', TaskController.update);
app.delete('/task', TaskController.remove);

async function start() {
    try {
        await connect();
        app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
    } catch (error) {
        console.log('Server error: ', error);
        process.exit(1);
    }
}

async function connect() {
    try {
        await mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connect to database.');
    } catch(error) {
        console.log('Could not connect to db: ', error);
    }
}

start();