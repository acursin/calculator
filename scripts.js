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
    numToEnter: 'first',
    lastBtn: '',
}

const updateDisplay = function (newDisplayNum) {
    if (Number.isNaN(newDisplayNum)) {
        display.textContent = 'Error!'
    }
    else if (memory.lastBtn !== 'num') {
        display.textContent = newDisplayNum;
    } else {
        display.textContent += newDisplayNum;
    }

    displayNum = +display.textContent;
}

const calculate = function (lastBtnPressed) {
    if (memory.numToEnter === 'first') {
        memory.firstNum = displayNum;
    }
    else {
        memory.secondNum = displayNum;
    }

    memory.lastBtn = lastBtnPressed;
    let calculatedNum = operate(memory.firstNum, memory.operator, memory.secondNum);
    updateDisplay(calculatedNum);
    memory.firstNum = calculatedNum;
    memory.numToEnter = 'first';
}

const numPress = function (numInput) {
    if (numInput === '0' && display.textContent === '0') return;
    updateDisplay(numInput);
    memory.lastBtn = 'num';
}

const decimalPress = function (decimalInput) {
    if (display.textContent.includes('.')) return;

    if (memory.lastBtn !== 'num') {
        updateDisplay('0.')
    } else {
        updateDisplay(decimalInput);
    }
    memory.lastBtn = 'num';
}

const operatorPress = function (operatorInput) {
    if (memory.lastBtn != 'operator' && memory.numToEnter === 'second') {
        calculate('operator');
    }
    memory.firstNum = displayNum;
    memory.operator = operatorInput;
    memory.numToEnter = 'second';
    memory.lastBtn = 'operator';
}

const equalsPress = function () {
    if (memory.operator !== '') calculate('equals');
}

const backspacePress = function () {
    memory.lastBtn = 'backspace';
    if (display.textContent.length === 1) {
        updateDisplay('0');
    } else {
        updateDisplay(display.textContent.slice(0, -1));
    }
}

const clearPress = function () {
    memory.firstNum = 0;
    memory.operator = '';
    memory.secondNum = 0;
    memory.numToEnter = 'first';
    memory.lastBtn = '';
    updateDisplay('0');
}

const numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => numPress(e.target.textContent));
});

const decimalBtn = document.querySelector('.decimal-btn');
decimalBtn.addEventListener('click', (e) => decimalPress(e.target.textContent));

const operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => operatorPress(e.target.textContent));
});

const equalsBtn = document.querySelector('.equals-btn');
equalsBtn.addEventListener('click', () => equalsPress());

const backspaceBtn = document.querySelector('.backspace-btn');
backspaceBtn.addEventListener('click', () => backspacePress());

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => clearPress());

document.addEventListener('keydown', (e) => {
    if (+e.key || e.key === '0') numPress(e.key);

    else if (e.key === '.') decimalPress(e.key);

    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        operatorPress(e.key);
    }
    else if (e.key === '=' || e.key === 'Enter') equalsPress();

    else if (e.key === 'Backspace') backspacePress();
});