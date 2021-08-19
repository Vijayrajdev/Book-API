// Temporary database

const books = [
    {
        ISBN: "12345Book",
        title: "Tesla!!!",
        pubDate: "2021-08-05",
        language: "en",
        numPage: 250,
        authors: [1, 2],
        publication: [1],
        category: ["tech", "space", "education"]
    }
];

const author = [
    {
        id: 1,
        name: "Vijay",
        books: ["12345Book", "secretBook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    }
];

const publication = [
    {
        id: 1,
        name: "Writex",
        books: ["12345Book"]
    }
];

module.exports = { books, author, publication };