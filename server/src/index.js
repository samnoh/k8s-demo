import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import './models/pgSetup';
import './models/redisSetup';

import indexRouter from './routes/index';

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(indexRouter);

app.listen(app.get('port'), () => {
    console.log('Listening on', app.get('port'));
});
