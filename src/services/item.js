// "use strict";
import cheerio from 'cheerio';
import requestPromise from 'request-promise';
import puppeteer from 'puppeteer';
import linkService from './link';
import priceService from './price';



async function getPageContent(payload){

    let url = buildUrl(payload)

    if(payload.browser){
        return await requestPromiseBrowser(url);
    }

    return await requestPromise(url);
}


async function requestPromiseBrowser(url){

    let browser = await puppeteer.launch({
        headless: false, // não mostrar o navegador, default -> true
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
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
    return  url.replace('{page}', numberOfPage);
}

function clean(element){
    return element.replace(/\s+/g,' ').trim();
}

async function getItems(url, payload){

    let responseHtml = await requestPromise(url);
    let $ = cheerio.load(responseHtml);

    let content = payload.content;
    let itemData = payload.item;

    let promiseList = $(content).map( async (idx, el) => {

            let $el = $(el);
            let item = {};

            for (let nameAttribute in itemData) {

                if(nameAttribute === "price"){
                    item[nameAttribute] = await priceService.regexRealPrice(clean($el.find(itemData[nameAttribute]).text()));

                }else if(nameAttribute === "link"){

                    item[nameAttribute] = await linkService.buildLink(payload.host, itemData[nameAttribute], $el);
                }else{

                    item[nameAttribute] = clean($el.find(itemData[nameAttribute]).text())
                }
            }

            return item;
    });

    return await Promise.all(promiseList);
}

async function getByPages(payload){

    let list = [];
    let i = 1; //incremente pages

    while(i <= payload.numberPages){

        let url = buildUrl(payload)
            url = addPage(url, i);

        let items = await getItems(url, payload);
        list.push(...items);

        i++;
    }

    return list;
}

async function testPayload(payload){

    let responseHtml = await getPageContent(payload);

    let $ = cheerio.load(responseHtml);

    let content = payload.content;
    let itemData = payload.item;

    let listItens = [];

    console.log("====================");
    console.log("itens no content: " , $(content).length);

    for(let el of $(content)){

        let $el = $(el);
        let item = {};

        for (let nameAttribute in itemData) {

            if(nameAttribute === "price"){
                item[nameAttribute] = await priceService.regexRealPrice(clean($el.find(itemData[nameAttribute]).text()));

            }else if(nameAttribute === "link"){

                item[nameAttribute] = await linkService.buildLink(payload.host, itemData[nameAttribute], $el);
            }else{

                item[nameAttribute] = clean($el.find(itemData[nameAttribute]).text())
            }
        }

        listItens.push(item);
    }

    return listItens;
}


module.exports = {

    buildJson: function(payload) {
        return getByPages(payload);
    },

    testPayload: function(payload){
        return  testPayload(payload);
    }
};




