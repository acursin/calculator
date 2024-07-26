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

const MAX_DISPLAY_LENGTH = 9;

const display = document.querySelector('.display');
let displayNum = +display.textContent;

let memory = {
    firstNum: 0,
    operator: '',
    secondNum: 0,
    numToEnter: 'first',
    numInProgress: false,
    disabledOperator: '',
}

const updateDisplay = function (newDisplayNum) {
    if (Number.isNaN(newDisplayNum)) {
        display.textContent = 'Error!'
    }
    else if (memory.numInProgress === false) {
        display.textContent = newDisplayNum;
    } else {
        display.textContent += newDisplayNum;
    }

    displayNum = +display.textContent;

    fitDisplay();
}

const fitDisplay = function () {
    if (display.textContent.replace('.', '').length <= MAX_DISPLAY_LENGTH) {
        return;
    }

    let trimmedNum = '';

    if (displayNum >= 999999999) {
        trimmedNum = displayNum.toExponential().replace('+', '');
        if (trimmedNum.length > MAX_DISPLAY_LENGTH + 1) {
            trimmedNum = displayNum.toExponential(6).replace('+', '');
        }
    } else {
        let preDecimalLen = display.textContent
            .slice(0, display.textContent.indexOf('.'))
            .length;

        trimmedNum = displayNum.toFixed(9 - preDecimalLen);
    }

    display.textContent = trimmedNum;
    return;
}

const numPress = function (numInput) {
    if (numInput === '0' && display.textContent === '0') return;
    if (memory.numInProgress === true
        && display.textContent.replace('.', '').length === MAX_DISPLAY_LENGTH) {
            return;
        }
    memory.disabledOperator = '';
    updateDisplay(numInput);
    memory.numInProgress = true;
}

const decimalPress = function (decimalInput) {
    if (display.textContent.includes('.')) return;

    if (memory.numInProgress === false) {
        updateDisplay('0.');
        memory.numInProgress = true;
    } else {
        updateDisplay(decimalInput);
    }
    memory.disabledOperator = '';
}

const equalsPress = function () {
    if (memory.operator === '') return;
    if (memory.numToEnter === 'first') {
        memory.firstNum = displayNum;
    }
    else {
        memory.secondNum = displayNum;
    }

    let calculatedNum = operate(memory.firstNum, memory.operator, memory.secondNum);
    memory.firstNum = calculatedNum;
    memory.numToEnter = 'first';
    memory.numInProgress = false;
    memory.disabledOperator = '';
    updateDisplay(calculatedNum);
}

const operatorPress = function (operatorInput) {
    if (memory.disabledOperator === operatorInput) return;
    if (memory.disabledOperator === '' && memory.numToEnter === 'second') {
        equalsPress();
    }
    memory.firstNum = displayNum;
    memory.operator = operatorInput;
    memory.numToEnter = 'second';
    memory.numInProgress = false;
    memory.disabledOperator = operatorInput;
}

const backspacePress = function () {
    if (display.textContent.length === 1) {
        memory.numInProgress = false;
        updateDisplay('0');
    } else {
        memory.numInProgress = false;
        updateDisplay(display.textContent.slice(0, -1));
        memory.numInProgress = true;
    }
}

const clearPress = function () {
    memory.firstNum = 0;
    memory.operator = '';
    memory.secondNum = 0;
    memory.numToEnter = 'first';
    memory.numInProgress = false;
    memory.disabledOperator = '';
    updateDisplay('0');
}

const numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => numPress(e.target.value));
});

const decimalBtn = document.querySelector('.decimal-btn');
decimalBtn.addEventListener('click', (e) => decimalPress(e.target.value));

const equalsBtn = document.querySelector('.equals-btn');
equalsBtn.addEventListener('click', () => equalsPress());

const operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => operatorPress(e.target.value));
});

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
    else if (e.key === 'x') operatorPress('*');

    else if (e.key === '=' || e.key === 'Enter') equalsPress();

    else if (e.key === 'Backspace') backspacePress();

    else if (e.key === 'Escape') clearPress();
});