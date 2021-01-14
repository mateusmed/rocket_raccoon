


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


module.exports = {

    regexRealPrice: function (price){
        return regexRealPrice(price);
    }
}