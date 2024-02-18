const resultEl = document.querySelector('.resultado');
const btns = document.querySelectorAll('.btn');

let result = '';
let currentInput = '';

const operators = ['+', '-', 'x', '/', '%'];

const isOperator = (value) => operators.includes(value);

const calculate = (num1, operator, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(operator){
        case '+':
            return num1 + num2;
            break;
        case '-':
            return num1 - num2;
            break;
        case 'x':
            return num1 * num2;
            break;
        case '/':
            if(num2 === 0){
                return 'Error'
            }
            return num1 / num2;
            break;
        case '%':
            return num1 % num2;
            break;
        default:
            return num2;
    }
};

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const inputValue = e.target.textContent;
        
        if(inputValue === 'C'){
            result = '';
            currentInput = '';
        } else if (inputValue === '+/-'){
            if(currentInput){
                currentInput = (parseFloat(currentInput)*-1).toString();
            }
        } else if(inputValue === '='){
            if(currentInput){
                result += currentInput;
                currentInput = '';
                result = calculate(...result.split(/([+\-x/])/)).toString()
                console.log(result);
            }
        } else if(isOperator(inputValue)){
            if(currentInput){
                result += currentInput + inputValue;
                currentInput = '';
            } else if(result && !isOperator(result.slice(-1))) {
                result += inputValue;

            }
        } else if(inputValue === '.') {
            if(!currentInput.includes('.')){
                currentInput += inputValue;
            }
        } else if(inputValue === 'D') {
            if(currentInput){
                let i = currentInput.slice(0,-1);
                currentInput = i;
            }
        } else {
            currentInput += inputValue;
        }

        resultEl.textContent = currentInput || result || '0'
    })
})