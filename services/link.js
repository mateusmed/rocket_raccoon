

async function buildLink(host, link, element){

    let $myEl = element;
    let layers = link.split(';');

    await layers.forEach((item) => {
        $myEl = $myEl.find(item)
    });

    let href = $myEl.attr('href');

    return host.concat(href);
}


module.exports = {

    buildLink: function (host, link, element){
        return buildLink(host, link, element);
    }
}