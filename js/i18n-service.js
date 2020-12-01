var gTrans = {
    title: {
        en: 'Books',
        es: 'Libros',
        he: 'ספרים'
    },
    subtitle: {
        en: 'Manage your bookstore',
        es: 'Administra tu librería',
        he: 'נהל את חנות הספרים שלך',
    },
    h2: {
        en: 'Add book',
        es: 'Agregar libro',
        he: 'הוסף ספר',
    },
    pickAuthor: {
        en: 'Pick Author',
        es: 'Elegir autor',
        he: 'בחר סופר',
    },
    pickBook: {
        en: 'Pick Book',
        es: 'Libro de selección',
        he: 'בחר ספר',
    },
    inputPrice: {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר',
    },
    add: {
        en: 'Add',
        es: 'Añadir',
        he: 'הוסף',
    },
    created: {
        en: 'Created',
        es: 'creado',
        he: 'נוצר',
    },
    author: {
        en: 'Author',
        es: 'Autor',
        he: 'סופר'
    },
    rate: {
        en: 'Rate',
        es: 'Velocidad',
        he: 'ציון',
    },
    price: {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר',
    },
    inputRate: {
        en: 'Rate',
        es: 'Velocidad',
        he: 'ציון',
    },
    bookRate: {
        en: 'Rate',
        es: 'Velocidad',
        he: 'ציון',
    },
    read: {
        en: 'Read',
        es: 'Leer',
        he: 'קרא',
    },
    updatePrice: {
        en: 'Update price',
        es: 'Actualizar precio',
        he: 'עדכן מחיר'
    },
    nextPage: {
        en: 'Next page',
        es: 'Siguiente página',
        he: 'עמוד הבא',
    },
    prevPage: {
        en: 'Prev page',
        es: 'pagina anterior',
        he: 'עמוד קודם',
    },
    loremImpsum: {
        en: makeLorem(),
        es: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).',
        he: makeLoremHe(),
    },
    coin: {
        en: '💲',
        es: '💶',
        he: '₪',
    },
    sort: {
        en: 'sort',
        es: 'ordenar',
        he: 'מיין',
    },
    inputAuthor: {
        en: 'Author',
        es: 'libro',
        he: 'סופר',
    },
    inputBook: {
        en: 'Book',
        es: 'ordenar',
        he: 'ספר',
    },
    inputNewAdding: {
        en: 'New Book',
        es: 'Nuevo libro',
        he: 'ספר חדש',
    },
    inputFromLibary: {
        en: 'Pick From Libary',
        es: 'Elegir de la biblioteca',
        he: 'בחר מהספרייה',
    },
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function(el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else { el.innerText = txt }
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}