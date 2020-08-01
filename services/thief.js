// "use strict";
import cheerio from 'cheerio';
import requestPromise from 'request-promise';

function buildPage(site, numberOfPage) {
    site['url'] = site.host.concat(site.page).replace('{page}', numberOfPage);
}

function clean(element){
    return element.replace(/\s+/g,' ').trim();
}

function regexRealPrice(price){

    let found = price.match(new RegExp('R\\$:[\\t ]*((\\d{1,3}\\.?)+(,\\d{2})?)'));

    if(found != null){
        return found[0];
    }

    found = price.match(new RegExp('R\\$ [\\t ]*((\\d{1,3}\\.?)+(,\\d{2})?)'));

    if(found != null){
        return found[0];
    }

    return price;
}


function buildLink(site, $el){

    let $myEl = $el;
    let layers = site.item.link.split(';');

    layers.forEach((item) => {
        $myEl = $myEl.find(item)
    });

    let href = $myEl.attr('href');

    return site.host.concat(href);
}

async function getItems(site){

    let responseHtml = await requestPromise(site.url);
    let $ = cheerio.load(responseHtml);

    let list = [];
    let itemData = site.item;

    $(site.content).each((idx, el) => {

        let $el = $(el);
        let item = {};

        item["name"] = clean($el.find(itemData.name).text());
        item["price"] = regexRealPrice(clean($el.find(itemData.price).text()));
        item["description"] = clean($el.find(itemData.description).text());
        item["link"] = buildLink(site, $el);

        list.push(item);
    });

    return list;
}

async function getByPages(site){

    let list = [];
    let i = site.incrementPage;

    while(i <= site.numberOfPage){

        buildPage(site, i);
        let items = await getItems(site);
        list.push(items);

        i = i + site.incrementPage;
    }

    return list;
}

module.exports = {

    test: async function(siteFound) {

        buildPage(siteFound, 1);
        return await getItems(siteFound);
    },

    justDoIt: async function(siteFound) {
        return await getByPages(siteFound);
    }
};




