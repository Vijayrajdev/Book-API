const express = require("express");

// Initialize express

const booky = express();
const database = require("./database");

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


booky.listen(3000, () => console.log("Server is up and running"));