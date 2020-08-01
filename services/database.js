import db from "../db/db";

const sites = db.sites;

module.exports  = {

    findByName: function (name) {
        return sites.filter( (item) => {
            return (item.name === name);
        });
    },

    findAll: function () {
        return sites;
    }
};
