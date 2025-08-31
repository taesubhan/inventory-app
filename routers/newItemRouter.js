const {Router} = require('express');
const createNewRouter = Router();
const {renderNew, newItemPost, newCategoryPost} = require('../controllers/newControllers');

createNewRouter.get('/', renderNew);
createNewRouter.post('/item', newItemPost);
createNewRouter.post('/category', newCategoryPost);

module.exports = {createNewRouter}