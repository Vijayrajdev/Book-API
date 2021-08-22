require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Databse

const database = require("./database/database");

// Models

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
const { parse } = require("dotenv");

// Initialize express

const booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("Connection established"));

/* 
Route           - /
Description     - Get all the books
Access          - PUBLIC
Parameter       - NONE
Method          - GET
*/

booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    res.json(getAllBooks);
});

/*
Route           - /is
Description     - Get specific book on ISBN
Access          - PUBLIC
Parameter       - ISBN
Method          - GET
*/

booky.get("/is/:isbn", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    // Null
    if (!getSpecificBook) {
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

booky.get("/c/:category", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ category: req.params.category });

    // Null
    if (!getSpecificBook) {
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

booky.get("/l/:language", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ language: req.params.language });

    // NUll
    if (!getSpecificBook) {
        return res.json({ error: `No book found for the language of ${req.params.language}` })
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

booky.get("/author", async (req, res) => {
    const getAllAuthors = await AuthorModel.find()
    return res.json(getAllAuthors);
});

/*
Route           - /author/i
Description     - Get specific author based on ID
Access          - PUBLIC
Parameter       - ID
Method          - GET
*/


booky.get("/author/i/:id", async (req, res) => {

    const getSpecificAuthor = await AuthorModel.findOne({ id: parseInt(req.params.id) });

    // Null
    if (!getSpecificAuthor) {
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

booky.get("/author/book/:isbn", async (req, res) => {

    const getSpecificAuthor = await AuthorModel.findOne({ ISBN: req.params.isbn });

    // Null
    if (!getSpecificAuthor) {
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

booky.get("/publication", async (req, res) => {
    const getAllPublications = await PublicationModel.find()
    return res.json(getAllPublications);
});

/*
Route           - /publication/i
Description     - Get specific publication based on id
Access          - PUBLIC
Parameter       - ID
Method          - GET
*/

booky.get("/publication/i/:id", async (req, res) => {

    const getSpecificPubication = await PublicationModel.findOne({ id: parseInt(req.params.id) });

    // Null
    if (!getSpecificPubication) {
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

booky.get("/publication/book/:isbn", async (req, res) => {

    const getSpecificPubication = await PublicationModel.findOne({ ISBN: req.params.isbn });

    // Null
    if (!getSpecificPubication) {
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

booky.post("/book/new", async (req, res) => {

    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json(
        {
            books: addNewBook,
            message: "Book was added !!!"
        }
    );
});

/*
Route           - /author/new
Description     - Add new authors
Access          - PUBLIC
Parameter       - NONE
Method          - POST
*/

booky.post("/author/new", (req, res) => {

    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        authors: addNewAuthor,
        message: "Author was added !!!"
    });
});

/*
Route           - /publication/new
Description     - Add new publications
Access          - PUBLIC
Parameter       - NONE
Method          - POST
*/

booky.post("/publication/new", (req, res) => {

    const { newPublication } = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({
        publications: addNewPublication,
        message: "Publication was added !!!"
    });
});

// PUT

/*
Route           - /book/update
Description     - Update book on isbn
Access          - PUBLIC
Parameter       - ISBN
Method          - PUT
*/

booky.put("/book/update/:isbn", async (req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );
    return res.json({ books: updatedBook });
});

/*
Route           - /book/author/update
Description     - Update / add new author
Access          - PUBLIC
Parameter       - ISBN
Method          - PUT
*/

booky.put("/book/author/update/:isbn", async (req, res) => {

    // Update book database
    const updatedBooks = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                author: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    // Update the author database 
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    return res.json(
        {
            books: updatedBooks,
            author: updatedAuthor,
            message: "New author was added !!!"
        }
    );
});

/*
Route           - /publication/update/book
Description     - Update / add new publication
Access          - PUBLIC
Parameter       - ISBN
Method          - PUT
*/

booky.put("/publication/update/book/:isbn", async (req, res) => {

    // Update the book database
    const updatedBookDatabase = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                publication: req.body.newPublication
            }
        },
        {
            new: true
        }
    );

    // Update the publictaion database
    const updatedPublicationDatabase = await PublicationModel.findOneAndUpdate(
        {
            id: req.body.newPublication
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    return res.json({
        books: updatedBookDatabase,
        publications: updatedPublicationDatabase,
        message: "New publication was added !!!"
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

booky.delete("/book/delete/:isbn", async (req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );

    return res.json({
        books: updatedBookDatabase
    });
});

/*
Route           - /author/delete/
Description     - Delete a author
Access          - PUBLIC
Parameter       - ID
Method          - DELETE
*/

booky.delete("/author/delete/:id", async (req, res) => {

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id: req.params.id
        }
    );
    return res.json(
        {
            author: updatedAuthorDatabase
        }
    );
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