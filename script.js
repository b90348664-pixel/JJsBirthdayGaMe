// Game state
let currentLevel = 1;
let secretNumber = 30;
let wrongAttempts = 0;

// Level 1: Number guessing
function checkGuess() {
    let guess = document.getElementById('guess-input').value;
    let hint = document.getElementById('guess-hint');
    
    if (!guess) {
        hint.innerHTML = "⚠️ Enter a number!";
        hint.style.color = "orange";
        return;
    }
    
    if (parseInt(guess) === 22) {
        hint.innerHTML = " LMAOOOO now you know you old asf ! Try again grandpa...";
        hint.style.color = "orange";
        wrongAttempts++;
        updateLifeCounter();
        return;
    }
    
    if (parseInt(guess) === secretNumber) {
        hint.innerHTML = "✅ YES! 30 - welcome to the old man club! (Even though you're really 22 lol)";
        hint.style.color = "green";
        
        setTimeout(function() {
            document.getElementById('level1').style.display = 'none';
            document.getElementById('level2').style.display = 'block';
            currentLevel = 2;
            
            document.getElementById('stage1').classList.remove('active');
            document.getElementById('stage2').classList.add('active');
        }, 2000);
    } 
    else if (parseInt(guess) < secretNumber) {
        hint.innerHTML = "⬆️ Too low! Round it up to a whole number...";
        hint.style.color = "orange";
        wrongAttempts++;
        updateLifeCounter();
    } 
    else if (parseInt(guess) > secretNumber) {
        hint.innerHTML = "⬇️ Too high! Try lower.";
        hint.style.color = "orange";
        wrongAttempts++;
        updateLifeCounter();
    }
}

function updateLifeCounter() {
    let hearts = document.querySelector('.hearts');
    if (hearts) {
        if (wrongAttempts === 1) {
            hearts.innerHTML = '❤️❤️❤️❤️🖤';
        } else if (wrongAttempts === 2) {
            hearts.innerHTML = '❤️❤️❤️🖤🖤';
        } else if (wrongAttempts === 3) {
            hearts.innerHTML = '❤️❤️🖤🖤🖤';
        } else if (wrongAttempts === 4) {
            hearts.innerHTML = '❤️🖤🖤🖤🖤';
        } else if (wrongAttempts >= 5) {
            hearts.innerHTML = '🖤🖤🖤🖤🖤';
            document.getElementById('guess-hint').innerHTML = "⚠️ Keep trying, grandpa! You got this!";
        }
    }
}

function checkWord() {
    let answer = document.getElementById('word-input').value.toLowerCase().trim();
    let hint = document.getElementById('word-hint');
    
    if (answer === "the robin to your batman" || 
        answer === "the robin to my batman" || 
        answer === "robin to your batman" || 
        answer === "robin to my batman" ||
        answer === "robin batman") {
        
        hint.innerHTML = "🦇 YES! Every Batman needs their Robin!";
        hint.style.color = "green";
        
        setTimeout(function() {
            document.getElementById('level2').style.display = 'none';
            document.getElementById('level3').style.display = 'block';
            currentLevel = 3;
            
            document.getElementById('stage2').classList.remove('active');
            document.getElementById('stage3').classList.add('active');
            
            startConfetti();
        }, 2000);
    } else {
        hint.innerHTML = "❌ Not quite! Think Dynamic Duo...";
        hint.style.color = "red";
    }
}

function startConfetti() {
    for (let i = 0; i < 150; i++) {
        setTimeout(createConfettiPiece, i * 10);
    }
    
    let confettiInterval = setInterval(function() {
        for (let i = 0; i < 30; i++) {
            createConfettiPiece();
        }
    }, 3000);
    
    setTimeout(function() {
        clearInterval(confettiInterval);
    }, 15000);
}

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    const colors = ['#FFD700', '#FF69B4', '#FF4444', '#4A9EFF', '#FF8C00'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    let size = Math.random() * 10 + 5;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
    }
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.remove();
        }
    }, 5000);
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (currentLevel === 1) {
            checkGuess();
        } else if (currentLevel === 2) {
            checkWord();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    wrongAttempts = 0;
});