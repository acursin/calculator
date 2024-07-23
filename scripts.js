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