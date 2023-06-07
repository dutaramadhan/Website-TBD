const getBooks = "SELECT b.*, l.name, l.last_update , STRING_AGG(DISTINCT a.author_name, ', ') AS author_name FROM book b JOIN book_author ba ON b.book_id = ba.book_id JOIN author a ON ba.author_id = a.author_id JOIN language l ON b.language_id = l.language_id GROUP BY b.book_id, l.language_id"
const getBookById = "SELECT * FROM book WHERE book_id = $1"
const checkTitleExists = "SELECT b FROM book b WHERE b.book_title = $1"
const addBooks = "INSERT INTO book (book_title, description, release_year, language_id, book_price) VALUES ($1, $2, $3,$4,$5)"
const deleteBookById = "DELETE FROM book WHERE book_id = $1"
const updateBookById="UPDATE book SET book_title=$2, description=$3, release_year=$4, language_id=$5, book_price=$6 WHERE book_id=$1"
module.exports = {
    getBooks,
    getBookById,
    checkTitleExists,
    addBooks,
    deleteBookById,
    updateBookById,
}