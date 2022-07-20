document.addEventListener('keypress', (event) => {
  calculator.onkeypress(event);
});

const keyPressedNumbers = ['0','1','2','3','4','5','6','7','8','9'];
const keyPressedOperators = ['/', '*', '-', '+', 'Enter'];



class Calculator {
  constructor(operators, displayValue, operatorElements, keyPressedNumbers, keyPressedOperators) {
      this.operators = operators;
      this.displayValue = displayValue;
      this.operatorElements = operatorElements;
      this.keyPressedNumbers = keyPressedNumbers;
      this.keyPressedOperators = keyPressedOperators;
      this.waitingForOperator = false;
      this.value = null;
      this.operator = null;
  };
 
  onkeypress(event) {
      let keyName = event.key;
      
          
          if(keyPressedNumbers.includes(keyName)) {
              this.setNum(keyName);
          }
      
         
          if(keyPressedOperators.includes(keyName)) {
              keyName == 'Enter' ? keyName = '=' : keyName = keyName;
              this.calculateWithOperator(keyName);
          }
      
         
          if(keyName == 'Backspace') {
              this.resetDisplayValue();
          }
      
           
          if(keyName == ',' || keyName == '.') {
              this.setDot();
          }
  };
  
  setNum(clickedValue) {
      if(this.waitingForOperator) {
          this.displayValue = clickedValue;
              
          this.waitingForOperator = false;
          
          this.resetActiveOperatorStatus();
          
      } else {
  
          this.displayValue === '0' ? this.displayValue = clickedValue : this.displayValue = this.displayValue + clickedValue;
          
       }
              
      this.setDisplayNumber(this.displayValue);
  };
  
  setDot() {
      const clickedValue = '.';

      if(!this.displayValue.includes(clickedValue)) {

          this.displayValue = String(this.displayValue) + clickedValue;
          
          this.setDisplayNumber(this.displayValue);

      }      

  };
  
  resetDisplayValue() {

      this.displayValue = '0';
      this.value = null;

      this.resetActiveOperatorStatus();
      
      this.setDisplayNumber(this.displayValue);

  };
  
  setPercent() {

      if(this.displayValue != '0') {

          this.displayValue = parseFloat(this.displayValue) / 100;
      
          this.setDisplayNumber(this.displayValue);

      }

  };
  
  calculateWithOperator(typedOperator) {

      let pressedElement;
      for(let i=0; i < this.operatorElements.length; i++) {
          if(operatorElements[i].dataset.operator === typedOperator ) {
              pressedElement = operatorElements[i];
          }
      }

      const nextValue = parseFloat(this.displayValue);

      if(!this.value) {

          this.value = nextValue || 0;

      } else if(this.operator) {

          const currentValue = this.value;
          const computedValue = this.operators[this.operator](currentValue, nextValue);

          this.value = computedValue;
          this.displayValue = String(computedValue);
          this.setDisplayNumber(this.displayValue);

      }

      this.waitingForOperator = true;
      this.operator = typedOperator;

      
      if(this.operator != '=') {

          pressedElement.classList.add('active');

      } else {

          this.resetActiveOperatorStatus();

      }
      

  };
  
  resetActiveOperatorStatus() {

      for (var i = 0; i < this.operatorElements.length; i++) {

          this.operatorElements[i].classList.remove('active');

      }

  };
  
  setDisplayNumber(newDisplayValue) {

      document.getElementById('displayValue').value = String(newDisplayValue);

  }
}


const operators = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '=': (prevValue, nextValue) => nextValue
};

const displayValue = document.getElementById('displayValue').value;

const operatorElements = document.getElementsByClassName('operator');


const calculator = new Calculator(operators, displayValue, operatorElements, keyPressedNumbers, keyPressedOperators);


 



/*let string = "";
window.addEventListener("keypress",function(e){
  console.log(e.keyCode );
  let button=document.querySelector(`button[data-key="${e.keyCode}"]`);
  console.log(button);
});

let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button)=>{
  button.addEventListener('click', (e)=>{
    if(e.target.innerHTML == '='){
      string = eval(string);
      document.querySelector('input').value = string;
    }
    else if(e.target.innerHTML == 'C'){
      string = ""
      document.querySelector('input').value = string;
    }
    else{ 
    //console.log(e.target)
    string = string + e.target.innerHTML;
    document.querySelector('input').value = string;
      }
  })
})*/