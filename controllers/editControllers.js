const db = require('../db/query.js');

async function renderEdit(req, res) {
    const {itemID} = req.params;
    const {name, category_id} = await db.getItem(itemID);
    const categoryList = await db.getAllCategory();

    res.render('editView', {itemID, itemName:name, categoryID: category_id, categoryList});
}

async function editItem(req, res) {
    const {itemName, categoryID} = req.body;
    const {itemID} = req.params;
    await db.editItem(itemID, itemName, categoryID);
    res.redirect('/');
}

async function deleteItem(req, res) {
    const {itemID} = req.params;
    await db.deleteItems(itemID);
    res.redirect('/');
}

async function renderCategoryEdit(req, res) {
    const {categoryID} = req.params;
    const {category_title} = await db.getCategory(categoryID);

    res.render('categoryEditView', {categoryID, categoryTitle: category_title})
}

async function editCategory(req, res) {
    const {categoryTitle} = req.body;
    const {categoryID} = req.params;
    await db.editCategory(categoryID, categoryTitle);
    res.redirect('/');
}

async function deleteCategory(req, res) {
    const {categoryID} = req.params;
    await db.deleteCategory(categoryID);
    res.redirect('/');
}

module.exports = { renderEdit, editItem, deleteItem, renderCategoryEdit, editCategory, deleteCategory }
;