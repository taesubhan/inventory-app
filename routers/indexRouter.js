const {Router} = require('express');
const indexRouter = Router();
const {renderIndex,searchIndex} = require('../controllers/indexControllers');

indexRouter.get('/', renderIndex);
indexRouter.get('/search', searchIndex);

module.exports = {indexRouter};