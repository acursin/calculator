function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate (numA, operator, numB) {
    switch (operator) {
        case '+':
            return add(numA, numB);
        case '-':
            return subtract(numA, numB);
        case '*':
            return multiply(numA, numB);
        case '/':
            return divide(numA, numB);
        default:
            return "ERROR";
    }
}

const display = document.querySelector('.display');
let displayNum = +display.textContent;

let memory = {
    firstNum: 0,
    operator: '',
    secondNum: 0,
    lastBtn: '',
}

let updateDisplay = function (newDisplayNum) {
    if (memory.lastBtn !== 'num') {
        display.textContent = newDisplayNum;
    } else {
        display.textContent += newDisplayNum;
    }

    displayNum = +display.textContent;
}

let calculate = function (lastBtnPressed) {
    if (memory.lastBtn === 'equals') {
        memory.firstNum = displayNum;
    } else {
        memory.secondNum = displayNum;
    }

    memory.lastBtn = lastBtnPressed;
    updateDisplay(operate(memory.firstNum, memory.operator, memory.secondNum));
}

const numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        updateDisplay(e.target.textContent);
        memory.lastBtn = 'num';
    });
});

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
    memory.firstNum = 0;
    memory.operator = '';
    memory.secondNum = 0;
    memory.lastBtn = '';
    updateDisplay('0');
});

const operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (memory.operator && (memory.lastBtn != 'operator') && (memory.lastBtn != 'equals')) {
            calculate('operator');
        }
        memory.firstNum = displayNum;
        memory.operator = e.target.textContent;
        memory.lastBtn = 'operator';
    });
});

const equalsBtn = document.querySelector('.equals-btn');
equalsBtn.addEventListener('click', () => {
    if (memory.operator !== '') calculate('equals');
})