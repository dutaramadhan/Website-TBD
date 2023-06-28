const getPublishers = `SELECT * FROM publisher`
const getPublisherById = 'SELECT * FROM publisher WHERE publisher_id= $1'
const checkNamexists = `SELECT p FROM publisher p WHERE p.publisher_name = $1`
const addPublishers = `INSERT INTO publisher (publisher_name, telephone) VALUES ($1, $2)`
const deletePublisherById = `DELETE FROM publisher WHERE publisher_id = $1`
const updatePublisherById = `UPDATE publisher
SET publisher_name = $2, telephone = $3
WHERE publisher_id = $1;`


module.exports = {
    getPublishers,
    getPublisherById,
    checkNamexists,
    addPublishers,
    deletePublisherById,
    updatePublisherById,
}