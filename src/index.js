var cardsArray = [
    { name: 'nelson', img: './images/simpsons_PNG59.png' },
    { name: 'simps_fam', img: './images/simpsons_PNG22.png' },
    { name: 'barney', img: './images/simpsons_PNG32.png' },
    { name: 'bart', img: './images/simpsons_PNG34.png' },
    { name: 'cowboy', img: './images/simpsons_PNG41.png' },
    { name: 'montgomery', img: './images/simpsons_PNG58.png' },
    { name: 'hans', img: './images/simpsons_PNG43.png' },
    { name: 'kid2', img: './images/simpsons_PNG90.png' },
    { name: 'simps_fam1', img: './images/simpsons_PNG67.png' },
    { name: 'beer', img: './images/simpsons_PNG68.png' },
    { name: 'kid', img: './images/simpsons_PNG55.png' },
    { name: 'lisa', img: './images/simpsons_PNG48.png' },
];

var gameGrid = cardsArray.concat(cardsArray);
var btn = document.querySelector('button');


gameGrid.sort(function () {
    return 0.5 - Math.random();
})


var game = document.getElementById('game-board');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (i = 0; i < gameGrid.length; i++) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var match = function () {
    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
};

var resetGuesses = function () {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};

grid.addEventListener('click', function (event) {
    var clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
    if (count < 2) {
        count++;

        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        if (firstGuess !== '' && secondGuess !== '') {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
});