const db = require('../db/query.js');

async function renderIndex(req, res) {
    const items = await db.getAllItems();
    const categories = await db.getAllCategory();
    res.render('indexView', {items, categories, searchItems: {}});
}

async function searchIndex(req, res) {
    const {itemNameSearch, categoryID} = req.query;
    console.log(itemNameSearch, categoryID);
    const items = await db.getAllItemsBySearch(itemNameSearch, categoryID ? categoryID : null);
    const categories = await db.getAllCategory();
    res.render('indexView', {items, categories, searchItems: {itemNameSearch, categoryID}});
}

module.exports = {renderIndex, searchIndex}