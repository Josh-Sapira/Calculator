// Establish global veriables
let total = 0;
let buffer = "0";
let lastOperator;
let lastNumber = null;

// Store screen in constant
const screen = document.querySelector('.screen');

// On click funciton
function buttonClicked(val) {
    // Check if we are dealing with number or operator
    if(isNaN(val)) {
        handleSymbol(val);
    }
    else {
        handleNumber(val);
    }

    // Set inner text, round if too large first
    if((""+buffer).length > 10) {
        buffer = "" + parseFloat(buffer).toPrecision(9);
    }

    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C': 
            // If clear button is clicked, reset calculator
            total = 0;
            buffer = "0";
            break;
        case '=':
            // Do not do anything if no operation has been performed
            if(lastOperator === null || isNaN(buffer)) {
                return;
            }
            flushOperation(parseFloat(buffer));
            lastOperator = null;
            buffer = total;
            break;
        case '←':
            // If buffer is one char, "delete" by reseting to default. Otherwise,
            // take substring of first n-1 chars where n is the length of the string
            if(buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            // Call function to do math
            doMath(symbol);
            break;
    }

}

function handleNumber(strNumber) {
    if(buffer === "0") {
        buffer = strNumber;
    }
    else if(isNaN(buffer)) {
        buffer = strNumber;
    }
    else {
        buffer += strNumber;
    }
}

function doMath(symbol) {
    const floatBuffer = parseFloat(buffer);

    if (total === 0) {
        total = floatBuffer;
    } else {
        // Check if the lastOperator is not null and buffer is a number
        if (lastOperator !== null && !isNaN(buffer)) {
            flushOperation(floatBuffer);
        }
    }

    // Store last operator, reset buffer
    lastOperator = symbol;
    buffer = symbol;
}

function flushOperation(floatBuffer) {
    if(lastOperator === '+') {
        total += floatBuffer;
    }
    else if(lastOperator === '−') {
        total -= floatBuffer;
    }
    else if(lastOperator === '×') {
        total *= floatBuffer;
    }
    else if(lastOperator === '÷') {
        total /= floatBuffer;
    }

}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClicked(event.target.innerText);
    })
}

init();
