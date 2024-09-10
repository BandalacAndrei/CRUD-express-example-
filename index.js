const express = require('express');
const app = express();

app.use(express.json());

class Book {
    constructor(id, name, author, year, editions) {
        this.id = id;
        this.name = name;
        this.author = {
            firstName: author.firstName,
            lastName: author.lastName
        };
        this.year = year;
        this.editions = editions;
    }
}

let books = [
    new Book(1, 'Rich Dad Poor Dad', { firstName: 'Robert', lastName: 'Kiyosaki' }, 1997, [
        { publisher: 'Editira USARB', year: 2000 }
    ])
];



app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

app.post('/books', (req, res) => {
    const { id, name, author, year, editions } = req.body;
    const newBook = new Book(id, name, author, year, editions);
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const { name, author, year, editions } = req.body;
    book.name = name || book.name;
    book.author = author || book.author;
    book.year = year || book.year;
    book.editions = editions || book.editions;

    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');

    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
