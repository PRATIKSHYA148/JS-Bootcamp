const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = null;

function updateDisplay() {
  display.value = currentInput;
}

function handleNumber(number) {
  if (currentInput === '0' || currentInput === 'Error') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (operator !== null) {
    calculate();
  }
  previousInput = currentInput;
  currentInput = '0';
  operator = op;
}

// calculate result
function calculate() {
  if (operator === null) return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function clearCalculator() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateDisplay();
}


buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      clearCalculator();
    } else if (button.classList.contains('operator')) {
      handleOperator(value);
    } else if (button.classList.contains('equals')) {
      calculate();
    } else {
      handleNumber(value);
    }
  });
});
