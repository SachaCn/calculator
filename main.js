const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator-signs');
const equalButton = document.querySelector('#equal-btn');
const clearButton = document.querySelector('#clear-btn');
const clearEntryButton = document.querySelector('#clearEntry-btn');
const backspaceButton = document.querySelector('#backspace-btn');
const display = document.querySelector('#display');
let firstValue = [];
let secondValue = [];
let operator = '';
let solution = null;

clearButton.addEventListener('click', () => clearAll());
clearEntryButton.addEventListener('click', () => clearEntry());
backspaceButton.addEventListener('click', () => backspace());
equalButton.addEventListener('click',() => operate());
numberButtons.forEach(btn => btn.addEventListener('click', () => getNumber(btn)));
operatorButtons.forEach(btn => btn.addEventListener('click', () => {getOperator(btn); showActive(btn)}));

function operate() {
    let a = Number(firstValue.join(''));
    let b = Number(secondValue.join(''));
    firstValue = [];
    secondValue = [];
    removeActive();
    if(operator === '+') return add(a, b);
    if(operator === '-') return subtract(a, b);
    if(operator === '×') return mutliply(a, b);
    if(operator === '÷') return divide (a, b);
};

function getNumber(pressed) {
    if(operator == '') {
     firstValue.push(pressed.textContent);
     solution = null;
    display.textContent = firstValue.join('');   
    } else if (operator != '') {
    secondValue.push(pressed.textContent);
    display.textContent = secondValue.join('');
    }
};

function getOperator(pressed) {    
    if(solution == null && firstValue[0] == undefined) return;
    if(solution != null) {
        updateValue();
    }
    if(operator == '') {        
        operator = pressed.textContent;                
    } else if(operator != '') {
        operate();
        updateValue();
        operator = pressed.textContent;        
    }    
};

function add(a, b) {    
    solution = a + b;
    operator = '';
    return display.textContent = solution;
};

function subtract(a, b) {    
    solution = a - b;
    operator = '';
    return display.textContent = solution;
};

function mutliply(a, b) {    
    solution = a * b;
    operator = '';
    return display.textContent = solution;
};

function divide(a, b) {    
    solution = a / b;
    operator = '';
    return display.textContent = solution;
};

function updateValue() {
    firstValue = [`${solution}`];
    secondValue = [];
    solution = null;
};

function clearAll() {
    firstValue = [];
    secondValue = [];
    operator = '';
    solution = null;
    display.textContent = '0';
    removeActive();
};

function clearEntry() {    
    if(display.textContent == firstValue.join('')) {
        display.textContent = '0';
        firstValue = [];
    } else if (display.textContent == secondValue.join('')) {
        display.textContent = '0';
        secondValue = [];
    } else if(display.textContent == solution) {
        clearAll();
    }
};

function backspace() {
    if(display.textContent == firstValue.join('')) {
        firstValue.pop();
        display.textContent = firstValue.join(''); 
    } else if(display.textContent == secondValue.join('')) {
        secondValue.pop();
        display.textContent = secondValue.join('');
    }   
};

function showActive(pressed) {
    if(!pressed.classList.contains('active')) {
        operatorButtons.forEach(e => e.classList.remove('active'));
        pressed.classList.add('active');
    }    
};

function removeActive() {
    operatorButtons.forEach(e => e.classList.remove('active'));
};