const pool = require('./pool.js');

// Category
async function getAllCategory() {
    const {rows} = await pool.query('SELECT * FROM category ORDER BY category_id ASC');
    return rows;
}

async function getCategory(categoryID) {
    const {rows} = await pool.query(`SELECT * FROM category WHERE category_id = $1`, [categoryID])
    return rows[0];
}

async function insertCategory(category) {
    await pool.query('INSERT INTO category (category_title) VALUES ($1)', [category]);
}

async function editCategory(categoryID, newCategoryTitle) {
    await pool.query(`
        UPDATE category
        SET category_title = $2   
        WHERE category_id = $1
    `, [categoryID, newCategoryTitle])
}

async function deleteCategory(categoryID) {
    await pool.query(`
        DELETE FROM category
        WHERE category_id = $1    
    `, [categoryID])
}

// Items
async function getAllItems() {
    const {rows} = await pool.query(`
        SELECT i.*, c.category_title FROM inventory_items i
        LEFT JOIN category c
            ON i.category_id = c.category_id
        ORDER BY i.item_id ASC
    `);
    return rows;
}

async function getItem(id) {
    const {rows} = await pool.query(`SELECT * FROM inventory_items WHERE item_id = $1`, [id])
    return rows[0];
}

async function getAllItemsBySearch(itemText, categoryID) {
    let baseQuery = `
        SELECT * FROM inventory_items
            WHERE name ILIKE $1
    `;
    const queryParam = [`%${itemText}%`];

    if (categoryID) {
        baseQuery += ` AND category_id = $2`;
        queryParam.push(categoryID);
    }
    const {rows} = await pool.query(baseQuery, queryParam);
    return rows;
}

async function insertItem(itemName, categoryID) {
    await pool.query(`
        INSERT INTO inventory_items (name, category_id)
        VALUES ($1, $2)
    `, [itemName, categoryID])
}

async function editItem(itemID, newName, newCategoryID) {
    await pool.query(`
        UPDATE inventory_items
        SET name = $2,
            category_id = $3
        WHERE item_id = $1
    `, [itemID, newName, newCategoryID])
}

async function deleteItems(itemID) {
    await pool.query(`
        DELETE FROM inventory_items
        WHERE item_id = $1    
    `, [itemID])
}

module.exports = {
    getAllCategory, getCategory, insertCategory, editCategory, deleteCategory,
    getAllItems, getItem, getAllItemsBySearch, insertItem, editItem, deleteItems
}