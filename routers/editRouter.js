const {Router} = require('express');
const editItemRouter = Router();
const {renderEdit, editItem, deleteItem} = require('../controllers/editControllers');

editItemRouter.get('/:itemID', renderEdit);
editItemRouter.post('/edit/:itemID', editItem);
editItemRouter.post('/delete/:itemID', deleteItem);

module.exports = {editItemRouter};