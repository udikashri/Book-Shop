'use strict'
const KEY = 'books';
const PAGE_SIZE = 10;
var gBooks;
var gBooksNames = ['Anna Karenina', 'War and Peace', 'The Stories of Anton Chekhov', 'The Great Gatsby',
    'Middlemarch', `Harry Potter and the Sorcerer's Stone`, 'Harry Potter and the Chamber of Secrets',
    'Harry Potter and the Prisoner of Azkaban'
]
var gPageIdx = 0;
var gPages
var gSortedBy = 'created'
var gAuthors = [{ name: 'Leo Tolstoy', books: ['Anna Karenina', 'War and Peace'] }, { name: 'Anton Chekhov', books: ['The Stories of Anton Chekhov'] },
    { name: 'F. Scott Fitzgerald', books: ['The Great Gatsby'] }, { name: 'George Eliot', books: ['Middlemarch'] },
    {
        name: 'J. K. Rowling',
        books: [`Harry Potter and the Sorcerer's Stone`, 'Harry Potter and the Chamber of Secrets',
            'Harry Potter and the Prisoner of Azkaban'
        ]
    }
];

function movePage(direction) {
    console.log(direction);
    var elPagesList = document.querySelector('select[name=pageList]');
    if (direction === 'Next Page') {
        gPageIdx++;
        if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
        elPagesList.value = gPageIdx
    } else if (direction === 'Prev Page') {
        gPageIdx--;
        if (gPageIdx * PAGE_SIZE <= 0) gPageIdx = 0;
        elPagesList.value = gPageIdx
    } else { gPageIdx = direction }
}
_createBooks();

function getBooksForDisplay() {
    var pages = Math.ceil(gBooks.length / PAGE_SIZE)
    gPages = new Array(pages)
    for (var i = 0; i < (gPages.length); i++) {
        gPages[i] = i
    }
    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books;
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(author, bookName, price) {
    var book = _createBook(author, bookName)
    book.price = price;
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice, newRate) {

    var book = gBooks.find(function(book) {
        return book.id === bookId;
    })
    if (newPrice) {
        book.price = newPrice;
    }
    book.rate = newRate
    _saveBooksToStorage();
}

function getPages() {
    return gPages;
}

function getBooksNames() {
    return gBooksNames;
}

function getAuthors() {
    return gAuthors;
}

function _createBook(author, bookName) {
    if (!bookName) { bookName = author.books[getRandomIntInclusive(0, author.books.length - 1)] }
    if (!author.length) { author = author.name }
    return {
        id: makeId(),
        name: bookName,
        author: author,
        price: getRandomIntInclusive(1, 200),
        rate: makeRate(),
        desc: makeLorem(),
        createAt: Date.now()
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 30; i++) {
            var author = gAuthors[getRandomIntInclusive(0, gAuthors.length - 1)]
            books.push(_createBook(author))
        }
        gBooks = books;
        _saveBooksToStorage();
    }
    gBooks = books;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


function getBooksForSorting(books) {
    if (gSortedBy === 'created') {
        books.sort(compareCreated)
        return books;
    }

    if (gSortedBy === 'rate') {
        books.sort(compareRate)
        return books;
    }
    if (gSortedBy === 'author') {
        books.sort(compareAuthor)
        return books;
    }
    if (gSortedBy === 'price') {
        books.sort(comparePrice)
        return books;
    }
    return books;
}

function compareCreated(a, b) {
    if (+a.createAt > +b.createAt) {
        return -1;
    }
    if (+a.createAt < +b.createAt) {
        return 1;
    }
    return 0;
}

function compareRate(a, b) {
    if (+a.rate > +b.rate) {
        return -1;
    }
    if (+a.rate < +b.rate) {
        return 1;
    }
    return 0;
}

function comparePrice(a, b) {
    if (+a.price < +b.price) {
        return -1;
    }
    if (+a.price > +b.price) {
        return 1;
    }
    return 0;
}

function compareAuthor(a, b) {
    if (a.author[0].toLowerCase() < b.author[0].toLowerCase()) {
        return -1;
    }
    if (a.author[0].toLowerCase() > b.author[0].toLowerCase()) {
        return 1;
    }
    return 0;
}

function setFilter(filterBy) {
    console.log(filterBy);
    gFilterBy = filterBy
}

function setSorted(sortedBy) {
    gSortedBy = sortedBy
}