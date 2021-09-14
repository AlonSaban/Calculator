import { getOperatorsListComponent } from "./calc-operators.js";
import { getNumbersListComponent } from "./calc-numbers.js";
const displayInput = document.querySelector(".display")
const operatorsWrapper = document.querySelector(".operators")
const digitsWrapper = document.querySelector(".digits")
const digitsButtons = document.querySelectorAll(".digits button")
const operatorsButtons = document.querySelectorAll(".operators button")
const inputNumbers = [0, 0];
let operator = '';
let position = 0;
let displayNum = 0;
let previousDigit = 0;
let currentDigit = 0;
let displaySum = 0;

updateDisplayInput()
function updateDisplayInput(digit = 0) {
    if (digit === '.' && displayNum.includes('.')) return;
    displayInput.value = displayNum += digit;
}

function onDigitClick(event) {
    const digit = event.target.innerText;
    updateDisplayInput(digit);
}
function onOperatorClick(event) {
    const operator = event.target.innerText;
    updateDisplayInput(operator);
}

function updateCurrentNumber() {
    if (displayNum === '') return;
    displayInput.value = displayNum = 0;
    inputNumbers[position] = displayNum;
    position = 1
}

const operatorsList = getOperatorsListComponent(operatorsWrapper, function onOperatorSelected(sign) {
    console.log('sign: ' + sign);
    if (sign == '=') {
        updateCurrentNumber();
        getResultCalc()
    }
    else if (sign == 'AC') {
        clear();
    }
    else {
        operator = sign;
        checkInput(sign);
        updateDisplayInput(sign);
    }
})

const numbersList = getNumbersListComponent(digitsWrapper, function onNumbersSelected(sign) {
    console.log('number: ' + sign);
    updateDisplayInput(sign);
    sign = parseInt(sign);
    checkInput(sign)
})

function checkInput(sign) {
    if (typeof sign === 'number') {
        sign = '' + sign;
        currentDigit += sign;
        sign = parseInt(sign);
    }
    else {
        if (currentDigit != 0) {
            previousDigit = currentDigit;
            currentDigit = 0;
        }
        else {
            previousDigit = displaySum;
        }
    }
}

digitsButtons.forEach(button =>
    button.addEventListener("click", onDigitClick)
)

operatorsButtons.forEach(button =>
    button.addEventListener("click", onOperatorClick)
)

function clear() {
    const inputNumbers = [0, 0];
    position = 0;
    displayInput.value = displayNum = 0;
    currentDigit = 0;
    previousDigit = 0;
}

function getResultCalc() {
    let y = parseInt(previousDigit);
    let x = parseInt(currentDigit);

    switch (operator) {
        case '+':
            displaySum = y + x;
            updateDisplayInput(displaySum);
            currentDigit = displaySum;
            break;
        case '-':
            displaySum = y - x;
            updateDisplayInput(displaySum);
            currentDigit = displaySum;
            break;
        case '*':
            displaySum = y * x;
            updateDisplayInput(displaySum);
            currentDigit = displaySum;
            break;
        case '/':
            displaySum = y / x;
            updateDisplayInput(displaySum);
            currentDigit = displaySum;
            break;
        default:
            return;
    }
}