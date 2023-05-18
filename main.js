const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator-signs');
const equalButton = document.querySelector('#equal-btn');
const clearButton = document.querySelector('#clear-btn');
const clearEntryButton = document.querySelector('#clearEntry-btn');
const backspaceButton = document.querySelector('#backspace-btn');
const decimalButton = document.querySelector('#decimal-btn');
const plusMinusButton = document.querySelector('#plus-minus-button');
const display = document.querySelector('#display');
let firstValue = [];
let secondValue = [];
let operator = '';
let solution = null;

clearButton.addEventListener('click', () => clearAll());
clearEntryButton.addEventListener('click', () => clearEntry());
backspaceButton.addEventListener('click', () => backspace());
equalButton.addEventListener('click',() => operate());
decimalButton.addEventListener('click', () => getDecimal());
plusMinusButton.addEventListener('click', () => togglePlusMinus());
numberButtons.forEach(btn => btn.addEventListener('click', () => getNumber(btn)));
operatorButtons.forEach(btn => btn.addEventListener('click', () => {
    getOperator(btn); 
    showActive(btn);
}));
window.addEventListener('keydown', (e) => {
    const numKeys = document.querySelector(`.number[data-key="${e.code}"]`);   
    if(!numKeys) return;   
        getNumber(numKeys);
});
window.addEventListener('keydown', (e) => {
    const operatorKeys = document.querySelector(`.operator-signs[data-key="${e.code}"]`);     
    if(!operatorKeys) return;
        getOperator(operatorKeys);
        showActive(operatorKeys);
});
window.addEventListener('keydown', (e) => {
    const clearKey = document.querySelector(`#clear-btn[data-key="${e.code}"]`);     
    if(!clearKey) return;
        clearAll();
});
window.addEventListener('keydown', (e) => {
    const clearEntryKey = document.querySelector(`#clearEntry-btn[data-key="${e.code}"]`);     
    if(!clearEntryKey) return;
        clearEntry();
});
window.addEventListener('keydown', (e) => {
    const backspaceKey = document.querySelector(`#backspace-btn[data-key="${e.code}"]`);     
    if(!backspaceKey) return;
        backspace();
});
window.addEventListener('keydown', (e) => {
    const equalKey1 = document.querySelector(`#equal-btn[data-key1="${e.code}"]`);
    const equalKey2 = document.querySelector(`#equal-btn[data-key2="${e.code}"]`);
    const equalKey3 = document.querySelector(`#equal-btn[data-key3="${e.code}"]`);   
    if(!equalKey1 && !equalKey2 && !equalKey3) return;   
        operate();
});
window.addEventListener('keydown', (e) => {
    const decimalKey = document.querySelector(`#decimal-btn[data-key="${e.code}"]`);
    if(!decimalKey) return;
        getDecimal();
});

window.addEventListener('keydown', (e) => console.log(e));

function operate() {
    if(firstValue != undefined && secondValue[0] == undefined) return;
    let a = parseFloat(firstValue.join(''));
    let b = parseFloat(secondValue.join(''));
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

function getDecimal() {    
    if(display.textContent == firstValue.join('') && !firstValue.includes('.')) {
        firstValue.push('.');
        display.textContent == firstValue.join('');
    } else if(display.textContent == secondValue.join('') && !secondValue.includes('.')) {
        secondValue.push('.');
        display.textContent == secondValue.join('');
    }
};

function togglePlusMinus() {
    if(display.textContent == firstValue.join('') && !firstValue.includes('-')) {
        firstValue.unshift('-');
        display.textContent = firstValue.join('');
    } else if(display.textContent == firstValue.join('') && firstValue.includes('-')) {
        firstValue.shift();
        display.textContent = firstValue.join('');
    }else if(display.textContent == secondValue.join('') && !secondValue.includes('-')) {
        secondValue.unshift('-');
        display.textContent = secondValue.join('');
    } else if(display.textContent == secondValue.join('') && secondValue.includes('-')) {
        secondValue.shift();
        display.textContent = secondValue.join('');
    }
};

function add(a, b) {    
    solution = a + b;
    operator = '';
    return display.textContent = parseFloat(solution.toFixed(6));
};

function subtract(a, b) {    
    solution = a - b;
    operator = '';
    return display.textContent = parseFloat(solution.toFixed(6));
};

function mutliply(a, b) {    
    solution = a * b;
    operator = '';
    return display.textContent = parseFloat(solution.toFixed(6));
};

function divide(a, b) {    
    solution = a / b;
    operator = '';
    return display.textContent = parseFloat(solution.toFixed(6));
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