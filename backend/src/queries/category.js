const getCategories = `SELECT * FROM category`
const getCategoryById = 'SELECT * FROM category WHERE category_id= $1'
const checkNamexists = `SELECT c FROM category c WHERE c.category_name = $1`
const addCategories = `INSERT INTO category (category_name) VALUES ($1)`
const deleteCategoryById = `DELETE FROM category WHERE category_id = $1`
const updateCategoryById = `UPDATE category
SET category_name = $2
WHERE category_id = $1;`


module.exports = {
    getCategories,
    getCategoryById,
    checkNamexists,
    addCategories,
    deleteCategoryById,
    updateCategoryById,
}