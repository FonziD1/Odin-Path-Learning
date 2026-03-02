const display = document.getElementById('display'); 
const buttons = document.querySelectorAll('button');
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

buttons.forEach( (btn) => {
    btn.addEventListener('click', () => {

        const id = btn.id;
        const value = btn.innerText;


        if(btn.id === 'clear') {
           clear();
           return;
        }

       if(id === 'equals'){
        secondNumber = display.innerText;
        display.innerText = calculate();
        return;
       }
       if(id === 'backspace') {
        display.innerText = display.innerText.length > 1 ? display.innerText.slice(0,-1) : '0';
        return;
       }

       if(['add', 'subtract', 'multiply', 'divide', 'percent'].includes(id)) {
        operator = id;
        firstNumber = display.innerText;
        display.innerText = '0';
        return;
       }
        if (btn.classList.contains('digit')) {
            if(value === '.' && display.innerText.includes('.')) return;
            if(display.innerText === '0') display.innerText = value;
            else display.innerText += value;
            return;
        }
        
    }) 
})

let firstNumber = "";
let secondNumber = "";
let operator = ""; 

function clear(){
    display.innerText = '0';
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function  calculate(){
    let result;
    let number1 = parseFloat(firstNumber);
    let number2 = parseFloat(secondNumber);

    if(operator === '+'){
        result = number1 + number2;
    }
    if (operator === `-`){
        result = number1 - number2;
    }
    if (operator === `*`){
        result = number1 * number2;
    }
    if (operator === `/`){
        result = number1 / number2;
    }
 zc vbm,/123
 +365
 4
 *3`']{:.olkjimhukgybtfhvdcasZ    `Q12WE34RT5Y67U8IO90-[]7/9*-+'    if (operator === `%`){
        result = number1 % number2;
    }
    return result.toString();
}