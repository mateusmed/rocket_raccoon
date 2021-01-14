// "use strict";
import cheerio from 'cheerio';
import requestPromise from 'request-promise';

import linkService from './link';
import priceService from './price';

function buildPage(payload, numberOfPage) {
    return  payload.host.concat(payload.page).replace('{page}', numberOfPage);
}

function clean(element){
    return element.replace(/\s+/g,' ').trim();
}

async function getItems(url, payload){

    let responseHtml = await requestPromise(url);
    let $ = cheerio.load(responseHtml);

    let list = [];

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

            //espera
            return item;
    });


    let volta = await Promise.all(promiseList);
    return volta;
}

async function getByPages(payload){

    let list = [];
    let i = 1; //incremente pages

    while(i <= payload.numberPages){

        let url = buildPage(payload, i);
        let items = await getItems(url, payload);
        list.push(items);

        i++;
    }

    return list;
}

module.exports = {

    buildJson: async function(payload) {
        return await getByPages(payload);
    }
};




