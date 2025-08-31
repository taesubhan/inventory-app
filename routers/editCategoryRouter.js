const {Router} = require('express');
const editCategoryRouter = Router();
const {renderCategoryEdit, editCategory, deleteCategory } = require('../controllers/editControllers');

editCategoryRouter.get('/:categoryID', renderCategoryEdit);
editCategoryRouter.post('/edit/:categoryID', editCategory);
editCategoryRouter.post('/delete/:categoryID', deleteCategory);

module.exports = {editCategoryRouter};