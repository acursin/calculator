function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide (a, b) { return a / b; }

let firstNum = '';
let secondNum = '';
let curOperator = '';

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
let displayVal = display.textContent;

let updateDisplay = function (newDisplayVal) {
    if (newDisplayVal === 'clear') {
        displayVal = '0';
    } else if (displayVal === '0') {
        displayVal = newDisplayVal;
    } else {
        displayVal += newDisplayVal;
    }

    display.textContent = displayVal;
}

const numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach(btn => {
    btn.addEventListener('click', (event) => updateDisplay(event.target.textContent));
});

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => updateDisplay('clear'));