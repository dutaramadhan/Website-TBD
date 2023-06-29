const getLanguages = `SELECT * FROM language`
const getLanguageById = 'SELECT * FROM language WHERE language_id= $1'
const checkNamexists = `SELECT l FROM language l WHERE l.language_name = $1`
const addLanguages = `INSERT INTO language (language_name, last_update) VALUES ($1, $2)`
const deleteLanguageById = `DELETE FROM language WHERE language_id = $1`
const updateLanguageById = `UPDATE language
SET language_name = $2, last_update = $3
WHERE language_id = $1;`


module.exports = {
    getLanguages,
    getLanguageById,
    checkNamexists,
    addLanguages,
    deleteLanguageById,
    updateLanguageById,
}