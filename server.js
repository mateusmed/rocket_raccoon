import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';

import itemService from './services/item';


// ========================================================== (log)
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = { transports: [consoleTransport] };
const logger = new winston.createLogger(myWinstonOptions);
// ==========================================================

// ========================================================== (express)
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ==========================================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});


router.get('/health', (request,
                                   response) => {

    logger.info("request to: " + request.url);

    let responseBody = {
        success: 'true',
        message: 'system is up'
    };

    response.status(200).send(responseBody)
});


router.post('/retrivie',async (request,
                                     response) => {

        logger.info("request to: " + request.url);

        //filtrar se o payload está no formato adequado com o padrão determinado pelo sistema


        let list = await itemService.buildJson(request.body);

        response.status(200).send(list)

});


app.use("/", router);