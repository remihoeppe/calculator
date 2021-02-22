const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.display')

const calculate = (num1, operator, num2) => {
  let result = '';// set the result variable to be an empty string
  const firstNum = parseFloat(num1) // set the first number to be a float (decimal interger)
  const secondNum = parseFloat(num2) // ""
  
  if (operator === 'add') return result = (firstNum + secondNum).toFixed(5);
  if (operator === 'substract') return result = (firstNum - secondNum).toFixed(5);
  if (operator === 'multiply') return result = (firstNum * secondNum).toFixed(5);
  if (operator === 'divide') return result = (firstNum / secondNum).toFixed(5);
  // give the result of calculate depending on the operator
  // toFixed function will limit number of decimals returned
  }
  

keys.addEventListener('click', event => {
  if (event.target.matches('button')) {
   // everytime a button is pressed the conditions below will be checked

   // USING DATASET
   // The dataset read-only property of the HTMLOrForeignElement mixin provides read/write access to custom data attributes (data-*) on elements. It exposes a map of strings (DOMStringMap) with an entry for each data-* attribute.

   const key = event.target; 
   // created a key const having the value of the target
   const action = key.dataset.action; 
   // created a const having the value of the operator
   const keyValue = key.textContent; 
   // set the value of key to be equal to the text content of the button
   const displayedNum = display.textContent;
   // created a const equal to the value on display
   const previousKeyType = calculator.dataset.previousKeyType;
   // created a const equal to the previous key used

   Array.from(key.parentNode.children)
    .forEach(key => key.classList.remove('is-depressed'))
   // Remove the depressed class to pressed buttons

   if (!action) { // for pressed button that have no action (ie numbers)
    if (
      displayedNum === '0' || 
      // if the displayed number is 0
      previousKeyType === 'operator' || 
      // or if the previous key used was an operator
      previousKeyType === 'calculate'
      // or if the previous key used was =
  ){
      display.textContent = keyValue;
    // then the keyValue (ie number) will be displayed
    } else {
      display.textContent = displayedNum + keyValue;
      // otherwise the numbers will concatonate 
    }
    calculator.dataset.previousKeyType = 'number';
    // this sets the previous key typed to be a number
  }

  if (action === 'decimal') { // everytime the . button is pressed
    if (previousKeyType === 'operator' || 
      previousKeyType === 'calculate'
      // this check if the last button pressed was either an operator or = btn (ie this will start a new number)
  ) { 
    display.textContent = '0.';
    // then the float will have zero as first number
  } else if (!display.textContent.includes('.')) {
    display.textContent = displayedNum + '.';
    // add a decimal separator when "decimal button is pressed to the condition that displayed content does NOT already contain one"
  } 
    calculator.dataset.previousKeyType = 'decimal';
    // this saves the last key types as a '.'
  }

    if (
    action === 'add' ||
    action === 'substract' ||
    action === 'multiply' ||
    action === 'divide'
    // for any operator pressed
    ) {
      const firstValue = calculator.dataset.firstValue; 
      // create a constant taking the first value in the calculator
      const operator = calculator.dataset.operator; 
      // create the constant to be equal the operator
      const secondValue = displayedNum; // set the second valued to be the one currently displayed

      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        // check if 
      ) {
        const mathValue = calculate(firstValue, operator, secondValue);
        display.textContent = mathValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      
      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      } else {
        key.textContent = 'AC'
      }
      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear'
      // This will clear the dispaly ane reset the displayed value to be
      // it will reset all dataset created above to be empty strings
    }
    
    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue; 
      // create the constant to be equal the variable set above
      let operator = calculator.dataset.operator; 
      // create the constant to be equal the variable set above
      let secondValue = displayedNum; 
      // set the second valued to be the one currently displayed

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue
        }
        display.textContent = calculate(firstValue, operator, secondValue)
        // diaply the result of the calculate function
      }

      calculator.dataset.modValue = secondValue
      calculator.dataset.previousKeyType = 'calculate'
    }
  }
})