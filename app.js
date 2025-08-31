require('dotenv').config();
const express = require('express');
const app = express();
const {indexRouter} = require('./routers/indexRouter');
const {createNewRouter} = require('./routers/newItemRouter');
const {editItemRouter} = require('./routers/editRouter');
const {editCategoryRouter} = require('./routers/editCategoryRouter');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/new', createNewRouter);
app.use('/item', editItemRouter);
app.use('/category', editCategoryRouter);

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

