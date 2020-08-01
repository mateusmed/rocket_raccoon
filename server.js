// Set up the express app
import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';


import thiefService from './services/thief';
import db from './services/database'

const consoleTransport = new winston.transports.Console();
const myWinstonOptions = { transports: [consoleTransport] };
const logger = new winston.createLogger(myWinstonOptions);
const app = express();
// app.use(express.bodyParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});


app.get('/health', (req, res) => {

    logger.info("request to: " + req.url);

    let response = {
        success: 'true',
        message: 'system is up'
    };

    res.status(200).send(response)
});

app.get('/site', (req, res) => {
    logger.info("request to: " + req.url);
    res.status(200).send(db.findAll())
});

app.get('/site/:name', (req, res) => {

    let siteName = req.params.name;
    logger.info("request to: " + req.url);
    logger.info("site: " + siteName);

    let siteList = db.findByName(siteName);

    if(siteList.length === 0){
        return res.status(404).send()
    }

    res.status(200).send(siteList[0])
});

app.get('/site/:name/test', async (req, res) => {

    let siteName = req.params.name;
    let siteList = db.findByName(siteName);

    if(siteList.length === 0){
        return res.status(404).send()
    }

    let response = await thiefService.test(siteList[0]);
    res.status(200).send(response)
});

app.get('/site/:name/run', async (req, res) => {

    try {

        let siteName = req.params.name;
        logger.info("request to: " + req.url);
        logger.info("site: " + siteName);

        let siteList = db.findByName(siteName);

        if(siteList.length === 0){
            return res.status(404).send()
        }

        let response = await thiefService.justDoIt(siteList[0]);
        res.status(200).send(response)

    }catch(error) {
        res.status(500).send('Error');
        console.error(error);
    }
});

// construa uma maquina dada uma especificação;
// construir o payload
app.post('/site/:name/machine', async (req, res) => {
    let body = req.body;
    res.status(200).send(body);
});

// construa uma maquina dada uma especificação;
// pequena , média ou grande
// app.get('/site/:name/run', async (req, res) => {
//
// });

