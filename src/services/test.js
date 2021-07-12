// "use strict";
// import cheerio from 'cheerio';
//import requestPromise from 'request-promise';

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const requestPromise = require('request-promise');


async function simpleTestRequest(payload){

    try{
        let browser = await puppeteer.launch({
            headless: true, // não mostrar o navegador, default -> true
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        });

        const page = await browser.newPage();
        await page.goto("http://www.google.com" ,{ waitUntil: 'networkidle0' });

        console.log(await page.content());

        await browser.close();

    }catch (e) {
        console.log(e);
    }

    ///html/body/ntp-app//div[1]/ntp-logo//div
    // const [el] = await page.$x('//*[@id="input"]');
    //
    // let placeHolder = el.getProperty('placeholder')
    //
    // console.log(el);
    // console.log(placeHolder);
    // browser.close();
}

function buildUrl(payload) {
    return  payload.host.concat(payload.page);
}


async function testPayload(payload){

    let url = buildUrl(payload)

    let responseHtml = await requestPromise(url);

    console.log("==================");
    console.log(responseHtml);
    console.log("==================");

    let $ = cheerio.load(responseHtml);

    let content = payload.content;
    let itemData = payload.item;


    console.log("content --->", $(content));

    // $(content).each( async (idx, el) => {
    //
    //     let $el = $(el);
    //
    //     let find = await $el.find(itemData['name']).text();
    //
    //     console.log("--->", find);
    // })
}




async function main(){

    let payload = {
            "name": "gafanhoto",
            "host": "https://gafanho.to/",
            "page": "",
            "content": "div[style=\"width: 250px; max-width: 250px; overflow: hidden;\"]",
            "item": {
                "price": "div[style=\"width: 100%; color: #508991; padding-left: 10px; padding-right: 10px; text-decoration: none; z-index: 100; margin-top: 15px;\"]"
            },
            "numberPages": 1
        }

    await simpleTestRequest(payload);

}

main();