'use strict'

function onInit() {
    renderBooks();
    renderAuthorsInput();
    renderPagesInput()
}

function renderAuthorsInput() {
    var authors = getAuthors()
    var strHtmls = authors.map(function(author) {
        return `
        <option value="${author.name}">${author.name}</option>
        `
    })
    renderBooksInput(authors[0].name)

    var elAuthorList = document.querySelector('select[name=authorList]');
    elAuthorList.innerHTML = strHtmls.join('')
}

function renderBooksInput(currAuthorName) {
    var authors = getAuthors()
    var books = authors.filter(function(author) {
        return (author.name === currAuthorName)
    })
    var strHtmls = books[0].books.map(function(book) {
        return `
        <option>${book}</option>
        `
    })
    var elBooksList = document.querySelector('select[name=booksList]');
    elBooksList.innerHTML = strHtmls.join('')
}

function renderPagesInput() {
    var pages = getPages()
    var strHtmls = pages.map(function(page) {
        return `
        <option value="${page}">${page}</option>
        `
    })
    var elPagesList = document.querySelector('select[name=pageList]');
    elPagesList.innerHTML = strHtmls.join('')
}

function renderBooks() {
    var books = getBooksForDisplay()
    books = getBooksForSorting(books)
    var strHtmls = books.map(function(book) {
        return `
        <div class="book-preview">
            <img class="card-img-top" src="img/${isDefault(book.name)}.jpg">
            <span class="delete-btn" onclick="onDeleteBook('${book.id}')">X</span>
            <div class="card-body">
                <h4 class="card-title">${book.name}</h4>
                <h5 class="card-title"><span data-trans="bookRate">Rate</span> : ${book.rate}</h5>
                <h6 class="card-title">${book.author}</h6>
                <p class="card-text"><span data-trans="price">Price</span>: ${book.price}<span data-trans="coin">💲</span></p>
                <a href="#" onclick="onReadBook('${book.id}')" data-trans="read">Read</a>
                <a href="#" onclick="onUpdateBook('${book.id}')" data-trans="updatePrice" >Update Price</a>
            </div>
        </div> 
        `
    })
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}

function isDefault(bookName) {
    var booksNames = getBooksNames()
    var imgName = bookName
    if (!booksNames.includes(bookName)) {
        imgName = 'Default'
    }
    return imgName
}

function renderAddingList(addingList) {
    var elfromLibary = document.querySelector('.fromLibary');
    var elnewAdding = document.querySelector('.newAdding');
    if (addingList === 'fromLibary') {
        elfromLibary.classList.remove('displayNone')
        elnewAdding.classList.add('displayNone')
    } else {
        elfromLibary.classList.add('displayNone')
        elnewAdding.classList.remove('displayNone')
    }
}

function onDeleteBook(bookId) {
    var isSure = confirm('Are you sure ???')
    if (!isSure) return
    deleteBook(bookId)
    renderBooks()
}

function onAddBookFromLibary() {
    var elAuthorList = document.querySelector('select[name=authorList]');
    var elBookList = document.querySelector('select[name=booksList]');
    var elPrice = document.querySelector('input[name=price]');
    var author = elAuthorList.value;
    var bookName = elBookList.value;
    var price = +elPrice.value;
    console.log('ADDING:', author, bookName, price);
    addBook(author, bookName, price)
    elPrice.value = ''
    renderBooks()
}

function onAddNewBook() {
    var elAuthorList = document.querySelector('input[name=authorList]');
    var elBookList = document.querySelector('input[name=booksList]');
    var elPrice = document.querySelector('input[name=price]');
    var author = elAuthorList.value;
    var bookName = elBookList.value;
    var price = +elPrice.value;
    console.log('ADDING:', author, bookName, price);
    addBook(author, bookName, price)
    elPrice.value = ''
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Price?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('.h4Span').innerText = book.rate
    elModal.querySelector('h5 .author').innerText = book.author
    elModal.querySelector('h6 .price').innerText = book.price
    if (!elModal.querySelector('p').innerText) {
        elModal.querySelector('p').innerText = book.desc
    }
    elModal.querySelector('h2').innerText = bookId
    elModal.hidden = false;
}

function onRateUpdate(bookId) {
    console.log(bookId);
    var rate = +document.querySelector('.h4Span').innerHTML
    console.log(rate);
    var userRate = +document.querySelector('input[name=rate]').value
    var newRate = makeRate(userRate, rate)
    console.log(newRate);
    updateBook(bookId, '', newRate);
    onReadBook(bookId)
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onMovePage(direction) {
    movePage(direction);
    renderBooks();
}

function onSortedBy(sortedBy) {
    setSorted(sortedBy);
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
}