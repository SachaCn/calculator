const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator-signs');
const equalButton = document.querySelector('#equal-btn');
const clearButton = document.querySelector('#clear-btn');
const clearEntryButton = document.querySelector('#clearEntry-btn');
const display = document.querySelector('#display');
let firstValue = [];
let secondValue = [];
let operator = '';

clearButton.addEventListener('click', () => clear());
equalButton.addEventListener('click',() => operate());
numberButtons.forEach(btn => btn.addEventListener('click', () => getNumber(btn)));
operatorButtons.forEach(btn => btn.addEventListener('click', () => getOperator(btn)));

function operate() {
    let x = Number(firstValue.join(''));
    let y = Number(secondValue.join(''));
    if(operator === '+') return add(x, y);
    if(operator === '-') return subtract(x, y);
    if(operator === '×') return mutliply(x, y);
    if(operator === '÷') return divide (x, y);
};

function add(a, b) {
    return display.textContent = a + b;
};

function subtract(a, b) {
    return display.textContent = a - b;
};

function mutliply(a, b) {
    return display.textContent = a * b;
};

function divide(a, b) {
    return display.textContent = a / b;
};

function clear() {
    firstValue = [];
    secondValue = [];
    operator = '';
    display.textContent = '0';
};

function getNumber(arg) {
    if(operator == '') {
     firstValue.push(arg.textContent);
    display.textContent = firstValue.join('');   
    } else if (operator != '') {
    secondValue.push(arg.textContent);
    display.textContent = secondValue.join('');
    }    
};

function getOperator(arg) {
    operator = arg.textContent;
    display.textContent = arg.textContent;
};