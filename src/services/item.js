// "use strict";
import cheerio from 'cheerio';
import requestPromise from 'request-promise';
import puppeteer from 'puppeteer';
import linkService from './link';
import priceService from './price';





async function getByPages(payload){

    let list = [];
    let i = payload.startPage;

    while(i <= payload.endPage){

        let url = buildUrl(payload);

        url = addPage(url, i);

        let items = await getItems(url, payload);
        list.push(...items);

        i++;
    }

    return list;
}

async function getPageContent(payload){

    let url = buildUrl(payload);

    if(payload.browser){
        return await requestPromiseBrowser(url);
    }

    return await requestPromise(url);
}


async function requestPromiseBrowser(url){

    let browser = await puppeteer.launch({
        headless: true, // não mostrar o navegador, default -> true
        args: [
            '--no-sandbox',
            '--disable-infobars',
            '--disable-extensions',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--disable-background-networking',
            '--disable-default-apps',
            '--disable-translate',
            '--disable-sync',
        ],

        // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();

    //entender melhor essa opção de espera
    //'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
    await page.goto(url ,{ waitUntil: 'networkidle0' });

    let pageContent = await page.content();

    await browser.close();

    return pageContent;
}

function buildUrl(payload) {
    return  payload.host.concat(payload.page);
}

function addPage(url, numberOfPage) {

    if(url.includes("{page}")){
        return url.replace('{page}', numberOfPage);
    }
}

function clean(element){
    return element.replace(/\s+/g,' ').trim();
}

async function getItems(url, payload){

    let responseHtml = await getPageContent(payload);
    let $ = cheerio.load(responseHtml);

    let content = payload.content;
    let itemData = payload.item;


    if($(content).length === 0){
        console.log("content is not found, check your payload");
        return [];
    }

    let promiseList = $(content).map( async (idx, el) => {

            let $el = $(el);
            let item = {};

            for (let nameAttribute in itemData) {

                if(nameAttribute === "price"){

                    let found = $el.find(itemData[nameAttribute]);

                    if(found){
                        let price = clean(found.text());
                        item[nameAttribute] = await priceService.regexRealPrice(price);
                    }
                    continue;
                }

                if(nameAttribute === "link"){
                    item[nameAttribute] = await linkService.buildLink(payload.host, itemData[nameAttribute], $el);
                    continue;
                }

                let found = $el.find(itemData[nameAttribute]);

                if(found){
                    item[nameAttribute] = clean(found.text())
                }
            }

            return item;
    });

    return await Promise.all(promiseList);
}




module.exports = {

    buildJson: function(payload) {
        return getByPages(payload);
    },

    testPayload: function(payload){
        return  getByPages(payload);
    }
};




