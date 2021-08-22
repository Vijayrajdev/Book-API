const mongoose = require("mongoose");


// Create book schema 

const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        authors: [Number],
        publication: [Number],
        category: [String]
    }
);

const BookModel = mongoose.model('books', BookSchema);

module.exports = BookModel;