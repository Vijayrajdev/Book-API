const express = require("express");
var bodyParser = require("body-parser");

// Databse

const database = require("./database");

// Initialize express

const booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

/* 
Route           - /
Description     - Get all the books
Access          - PUBLIC
Parameter       - NONE
Method          - GET
*/

booky.get("/", (req, res) => {
    res.json({ message: database.books });
});

/*
Route           - /is
Description     - Get specific book on ISBN
Access          - PUBLIC
Parameter       - ISBN
Method          - GET
*/

booky.get("/is/:isbn", (req, res) => {

    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` })
    };

    return res.json({ book: getSpecificBook });
});

/*
Route           - /c
Description     - Get specific book on category
Access          - PUBLIC
Parameter       - CATEGORY
Method          - GET
*/

booky.get("/c/:category", (req, res) => {

    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the category of ${req.params.category}` })
    };

    return res.json({ book: getSpecificBook });
});

/*
Route           - /l
Description     - Get specific book on language
Access          - PUBLIC
Parameter       - LANGUAGE
Method          - GET
*/

booky.get("/l/:language", (req, res) => {

    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );
    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the category of ${req.params.language}` })
    };

    return res.json({ book: getSpecificBook });
});

/*
Route           - /author
Description     - Get all the authors
Access          - PUBLIC
Parameter       - NONE
Method          - GET
*/

booky.get("/author", (req, res) => {
    return res.json({ authors: database.author });
});

/*
Route           - /author/i
Description     - Get specific author based on ID
Access          - PUBLIC
Parameter       - ID
Method          - GET
*/


booky.get("/author/i/:id", (req, res) => {

    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the ID ${req.params.id}` })
    };

    return res.json({ authors: getSpecificAuthor })
});

/*
Route           - /author/book
Description     - Get a specific author based on books
Access          - PUBLIC
Parameter       - ISBN
Method          - GET
*/

booky.get("/author/book/:isbn", (req, res) => {

    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the ISBN of ${req.params.isbn}` })
    };

    return res.json({ authors: getSpecificAuthor });
});

/*
Route           - /publication
Description     - Get all the publications
Access          - PUBLIC
Parameter       - NONE
Method          - GET
*/

booky.get("/publication", (req, res) => {
    return res.json({ publication: database.publication })
});

/*
Route           - /publication/i
Description     - Get specific publication based on id
Access          - PUBLIC
Parameter       - ID
Method          - GET
*/

booky.get("/publication/i/:id", (req, res) => {

    const getSpecificPubication = database.publication.filter(
        (publication) => publication.id === parseInt(req.params.id)
    );
    if (getSpecificPubication.length === 0) {
        return res.json({ error: `No publication found for the ID ${req.params.id}` })
    };

    return res.json({ publication: getSpecificPubication })
});

/*
Route           - /publication/book
Description     - Get specific publication based on book
Access          - PUBLIC
Parameter       - ISBN
Method          - GET
*/

booky.get("/publication/book/:isbn", (req, res) => {

    const getSpecificPubication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );
    if (getSpecificPubication.length === 0) {
        return res.json({ error: `No publication found for the ISBN ${req.params.isbn}` })
    };

    return res.json({ publication: getSpecificPubication });
});

// POST

/*
Route           - /book/new
Description     - Add new book
Access          - PUBLIC
Parameter       - NONE
Method          - POST
*/

booky.post("/book/new", (req, res) => {

    const newBook = req.body;
    database.books.push(newBook);
    return res.json({ updatedBooks: database.books });
});

/*
Route           - /author/new
Description     - Add new authors
Access          - PUBLIC
Parameter       - NONE
Method          - POST
*/

booky.post("/author/new", (req, res) => {

    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({ updatedAuthors: database.author });
});

/*
Route           - /publication/new
Description     - Add new publications
Access          - PUBLIC
Parameter       - NONE
Method          - POST
*/

booky.post("/publication/new", (req, res) => {

    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({ updatedPublications: database.publication });
});

booky.listen(3000, () => console.log("Server is up and running"));