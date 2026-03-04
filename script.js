// Создание летающих сердечек и цветочков (снизу вверх)
function createHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💖', '💗', '💓', '💕', '💘', '🌸', '💐', '🌹', '🌷', ''];
    
    setInterval(function() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(heart);
        
        setTimeout(function() {
            heart.remove();
        }, 7000);
    }, 300);
}

// Переключение страниц
function goToPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    window.scrollTo(0, 0);
    
    if (pageNumber === 2) {
        setTimeout(initGame, 100);
    }
}

// Показ комплиментов
function showCompliment(button) {
    const text = button.nextElementSibling;
    text.classList.toggle('show');
}

// ИГРА "НАЙДИ ПАРУ"
let gameInitialized = false;
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// 10 пар эмодзи (20 карточек total)
const emojis = [
    '🌹', '🌷', '', '🌻', '🌼', 
    '💖', '💕', '💝', '❤️', '💗'
];

function initGame() {
    if (gameInitialized) return;
    
    const grid = document.getElementById('gameGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Создаем пары (каждый эмодзи 2 раза) = 20 карточек
    let gameEmojis = [];
    emojis.forEach(function(emoji) {
        gameEmojis.push(emoji, emoji);
    });
    
    // Перемешиваем
    gameEmojis = shuffleArray(gameEmojis);
    
    // Создаем карточки
    gameEmojis.forEach(function(emoji, index) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.setAttribute('data-index', index);
        card.setAttribute('data-emoji', emoji);
        
        const content = document.createElement('span');
        content.className = 'content';
        content.textContent = emoji;
        
        card.appendChild(content);
        
        card.addEventListener('click', function() {
            flipCard(card);
        });
        
        grid.appendChild(card);
    });
    
    gameInitialized = true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    
    if (card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji')) {
        // Совпадение!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        const progressElement = document.getElementById('pairsFound');
        if (progressElement) {
            progressElement.textContent = matchedPairs;
        }
        
        flippedCards = [];
        canFlip = true;
        
        // Проверка победы (10 пар)
        if (matchedPairs === 10) {
            const nextBtn = document.getElementById('btnGameNext');
            if (nextBtn) {
                nextBtn.classList.add('show');
            }
            createCelebration();
        }
    } else {
        // Не совпали - закрываем
        setTimeout(function() {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function createCelebration() {
    const container = document.getElementById('heartsContainer');
    for (let i = 0; i < 50; i++) {
        setTimeout(function() {
            const celebrationEmojis = ['💖', '💗', '💐', '🌹'];
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animationDuration = '3s';
            container.appendChild(heart);
            
            setTimeout(function() {
                heart.remove();
            }, 3000);
        }, i * 50);
    }
}

// Запуск анимации сердечек при загрузке
createHearts();
