import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';
import {Users} from './routes/users';


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

dotenv.config();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//Routes Endpoints
app.get('/', function (req: Request, res: Response) {
    res.send('API Running!')
})

app.use('/users', Users);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
