import express from 'express'
import { connectionDB } from './db/config.js';
import syncDB from './db/init.js';
import cors from 'cors';
import allRoutes from './routes/index.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

connectionDB();
syncDB();

app.use(express.json())
app.use(allRoutes);

app.listen( 3000, ()=>{
    console.log('listening on 3000...')
});