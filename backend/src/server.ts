import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.router'
import workshopRouter from './routers/workshop.router'

const app = express();
app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

mongoose.connect('mongodb://127.0.0.1:27017/pia_projekat');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection in pia projekat is on!')
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/workshops', workshopRouter)

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));