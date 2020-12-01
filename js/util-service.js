'use strict';

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function makeLoremHe(size = 100) {
    var words = ['השמיים', 'יותר', 'שדה התעופה', 'היה', 'קשת בענן', 'שמח', 'אתה', 'כוכבים', '.', 'תהיה', 'זה קורה', 'פחות או יותר', '.', 'אני', 'הסיפור', 'מכל האנשים', 'רואה', 'כרגיל', 'קורה', 'במקרה כזה', 'בזמן הזה', 'זה', 'היה', 'סיפור אחר', '.', 'נתראה', 'מים', 'בבקשה', 'בי', 'נולד'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRate(userRate, rate) {
    if (!userRate) {
        var people = [{ name: 'puki', rate: getRandomIntInclusive(1, 10) }, { name: 'muki', rate: getRandomIntInclusive(1, 10) },
            { name: 'luki', rate: getRandomIntInclusive(1, 10) }, { name: 'luli', rate: getRandomIntInclusive(1, 10) },
            { name: 'lolo', rate: getRandomIntInclusive(1, 10) }, { name: 'lola', rate: getRandomIntInclusive(1, 10) },
            { name: 'yuni', rate: getRandomIntInclusive(1, 10) }, { name: 'boni', rate: getRandomIntInclusive(1, 10) },
            { name: 'jon', rate: getRandomIntInclusive(1, 10) }, { name: 'joni', rate: getRandomIntInclusive(1, 10) }
        ]
        var peopleSumRates = 0
        people.forEach(function(person) {
            peopleSumRates += person.rate
            return person.rate
        })
        var peopleAvgRate = peopleSumRates / people.length
        peopleAvgRate = peopleAvgRate.toPrecision(2)
        return peopleAvgRate
    } else {
        var peopleAvgRate = ((rate * 10 + userRate) / 11)
        peopleAvgRate = peopleAvgRate.toPrecision(2)
        console.log(peopleAvgRate);
        return peopleAvgRate
    }

}