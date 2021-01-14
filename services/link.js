

async function buildLink(host, link, element){

    let $myEl = element;
    let layers = link.split(';');

    await layers.forEach((item) => {
        $myEl = $myEl.find(item)
    });

    let href = $myEl.attr('href');


    let volta = host.concat(href);
    console.log(volta);

    return volta;
}


module.exports = {

    buildLink: function (host, link, element){
        return buildLink(host, link, element);
    }
}