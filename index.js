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

/*
Route           - /publication/update/book
Description     - Update / add new publication
Access          - PUBLIC
Parameter       - ISBN
Method          - PUT
*/

booky.put("/publication/update/book/:isbn", (req, res) => {

    // Update the publictaion database
    database.publication.forEach((pub) => {
        if (pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });

    // Update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.publication = req.body.pubId;
        }
    });

    return res.json({
        books: database.books,
        publications: database.publication,
        message: "Sucessfully Updated"
    });

});

// DELETE

/*
Route           - /book/delete/
Description     - Delete a book
Access          - PUBLIC
Parameter       - ISBN
Method          - DELETE
*/

booky.delete("/book/delete/:isbn", (req, res) => {

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;
    return res.json({ books: database.books });
});

/*
Route           - /author/delete/
Description     - Delete a author
Access          - PUBLIC
Parameter       - ID
Method          - DELETE
*/

booky.delete("/author/delete/:id", (req, res) => {

    const updatedAuthorDatabase = database.author.filter(
        (author) => author.id !== parseInt(req.params.id)
    );
    database.author = updatedAuthorDatabase;
    return res.json({ authors: database.author });
});

/*
Route           - /book/delete/author/
Description     - Delete author from book and related book from author
Access          - PUBLIC
Parameter       - ISBN, AUTHORID
Method          - DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {

    // Update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        };
    });

    // Update the author database
    database.author.forEach((eachAuthor) => {
        if (eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                (eachBook) => eachBook !== req.params.isbn
            );
            eachAuthor.books = newBookList;
            return;
        };
    });

    return res.json({
        books: database.books,
        authors: database.author,
        message: "Author deleted!!!"
    });
});



booky.listen(3000, () => console.log("Server is up and running"));