const db = require('../db/query');
const {body, validationResult} = require('express-validator');

async function renderNew(req, res) {
    const categories = await db.getAllCategory();
    res.render('newView', {categories});
}

async function newItemPost(req, res) {
    const {item, categoryID} = req.body;
    // console.log(item, categoryID);
    await db.insertItem(item, categoryID);
    res.redirect('/');
}

const validateCategory = [
    body('categoryTitle').trim()
        .custom(async (category) => {
            const existingCategories = (await db.getAllCategory()).map((value) => value.category_title.toLowerCase());
            if (existingCategories.includes(category.toLowerCase())) {
                throw new Error('Category already exists')
            };
            return true;
        })
]

async function addCategory(req, res) {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).render('newView', {
            errors: errors.array(),
            categories: await db.getAllCategory()
        })
    }
    const {categoryTitle} = req.body;
    // console.log(categoryTitle);
    await db.insertCategory(categoryTitle);
    res.redirect('/');
}

const newCategoryPost = [
    validateCategory,
    addCategory
]

module.exports = {renderNew, newItemPost, newCategoryPost};