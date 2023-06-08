const getBooks = `SELECT 
book.*, 
category.category_id, 
category.category_name, 
publisher.publisher_name, 
language.language_name, author.author_id, author.author_name
FROM book
INNER JOIN book_author ON book.book_id = book_author.book_id
INNER JOIN author ON book_author.author_id = author.author_id
INNER JOIN book_category ON book.book_id = book_category.book_id
INNER JOIN category ON book_category.category_id = category.category_id
INNER JOIN publisher ON book.publisher_id = publisher.publisher_id
INNER JOIN language ON book.language_id = language.language_id;
`
const getBookById = `SELECT 
book.*, 
category.category_id, 
category.category_name, 
publisher.publisher_name, 
language.language_name, author.author_id, author.author_name
FROM book
INNER JOIN book_author ON book.book_id = book_author.book_id
INNER JOIN author ON book_author.author_id = author.author_id
INNER JOIN book_category ON book.book_id = book_category.book_id
INNER JOIN category ON book_category.category_id = category.category_id
INNER JOIN publisher ON book.publisher_id = publisher.publisher_id
INNER JOIN language ON book.language_id = language.language_id
WHERE book.book_id=$1;`
const checkTitleExists = "SELECT b FROM book b WHERE b.book_title = $1"
const addBooks = "INSERT INTO book (book_title, description, release_year, language_id, book_price, publisher_id) VALUES ($1, $2, $3,$4,$5, $6)"
const bookAuthorQuery = `INSERT INTO book_author (book_id, author_id) VALUES ((SELECT book_id FROM book WHERE book_title = $1), $2)`;
const bookCategoryQuery = `INSERT INTO book_category (book_id, category_id) VALUES ((SELECT book_id FROM book WHERE book_title = $1), $2)`;
const deleteBookById = "DELETE FROM book WHERE book_id = $1"
module.exports = {
    getBooks,
    getBookById,
    checkTitleExists,
    addBooks,
    deleteBookById,
    bookAuthorQuery,
    bookCategoryQuery,
}