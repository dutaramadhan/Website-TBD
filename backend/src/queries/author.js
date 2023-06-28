const getAuthors = `SELECT * FROM author`
const getAuthorById = 'SELECT * FROM author WHERE author_id= $1'
const checkNamexists = `SELECT a FROM author a WHERE a.author_name = $1`
const addAuthors = `INSERT INTO author (author_name, year_born, year_died) VALUES ($1, $2, $3)`
const deleteAuthorById = `DELETE FROM author WHERE author_id = $1`
const updateAuthorById = `UPDATE author
SET author_name = $2, year_born = $3, year_died = $4
WHERE author_id = $1;`


module.exports = {
    getAuthors,
    getAuthorById,
    checkNamexists,
    addAuthors,
    deleteAuthorById,
    updateAuthorById,
}