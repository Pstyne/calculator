// Initialize variables

const display = document.querySelector(".display");
display.value = "0";

// Simple mathematical functions

const multiplication = (a,b) => a * b;
const division = (a,b) => a / b;
const addition = (a,b) => a + b;
const subtraction = (a,b) => a - b;

// The operating function of the calculator

const operate = s => {
  const store = s.split(" ");


  // while(store.length !== 1) {

    // Find the index of the operators. If multiply or divide is -1 then look for addition or subtraction
    
    const mdasIndex = store.findIndex(e => e.match(/[*/]/)) !== -1 ? store.findIndex(e => e.match(/[*/]/)) : store.findIndex(e => e.match(/[+-](?!\d)/));
    
    // Find multiplication or division first then addition or subtraction and work them from left to right
    
    const mdas = store.find( e => /[*/]/.test(e)) || store.find( e => /[+-](?!\d)/.test(e));

    switch(mdas) {
      case "*":
        store.splice(mdasIndex - 1, 3, multiplication(Number(store[mdasIndex - 1]), Number(store[mdasIndex + 1])).toString());
        break;
      case "/":
        store.splice(mdasIndex - 1, 3, division(Number(store[mdasIndex - 1]), Number(store[mdasIndex + 1])).toString());
        break;
      case "+":
      console.log(mdasIndex)
        store.splice(mdasIndex - 1, 3, addition(Number(store[mdasIndex - 1]), Number(store[mdasIndex + 1])).toString());
        break;
      case "-":
        store.splice(mdasIndex - 1, 3, subtraction(Number(store[mdasIndex - 1]), Number(store[mdasIndex + 1])).toString());
        break;
    }

    console.log(mdas)
    console.log(store)
  // }
  return store.join(" ");
};

// The press function serves to handle style changes when using the keypad

const press = e => {

  // Creating an array from the get elements function is necessary to use the array functions
  
  const buttons = Array.from(document.getElementsByTagName("button"));
  
  buttons.forEach( button => {
    if(button.value === e.key){
      e.type === "keydown" ? button.classList.add("active") : button.classList.remove("active");
    };
  });
};

// Input is triggered by clicking or key presses

const input = key => {

  // Using regex as conditionals

  if(/\d|\D/.test(key)) {
    
    if(/Backspace/.test(key)){

      // When backspace is pressed take the value at the end and slice it to replace the current value until it reaches the beginning of number entry

      display.value[display.value.length -1] !== " " ? display.value = display.value.slice(0, display.value.length - 1) : null;

    } else if(/Delete/.test(key)) {

      // When delete is pressed return the display value back to its initial value

      display.value = "0";

    } else if(/[/*+-]/.test(key)) {

      // When an operator button is pressed checks to see if the previous value is also an operator which will change according to operator if it's true

      /[/*+-]/.test(display.value.split("")[display.value.length - 2]) && !/\d/.test(display.value.split("")[display.value.length - 1]) ? display.value = display.value.slice(0, display.value.length - 2) + `${key} ` : display.value += ` ${key} `;

    } else if(/[.]/.test(key)) {

      // When the decimal button is pressed checks to see if the last number contains an existing decimal which will do nothing if true.

      // Create a store of numbers by splitting them against operators

      const store = display.value.split(/[/*+\-]/);

      // Check to see if the last number in the store is a floating number

      const lastNumIsFloat = /[.]/.test(store[store.length - 1]);

      // If it is then leave it as it is, otherwise make the number a floating point number

      lastNumIsFloat ? null : display.value += key;
    

    } else if(/Enter/.test(key)) {

      // Pressing Enter will execute the operating function of the calculator

      display.value = operate(display.value);

    } else {

      // The default behavior of number input using 0 as an initial value

      if(display.value === "0") {
        display.value = key;
      } else {
        display.value += key;
      }
    }

  }  

};

// The click and keydown listeners take advantage of the calculators functionality whereas the keyup listener is mainly for style changes

addEventListener("click", e => {

  // Prevent the input function from firing unless appropriate conditions are met

  if(e.target.value !== undefined && e.target.className !== "display") {
    input(e.target.value);
  }
});

addEventListener("keydown", e => {
  e.preventDefault();

  // Use only numbers except backspace, delete, and enter

  if((e.keyCode < 65 || e.keyCode > 90) && e.keyCode !== 32) {
    input(e.key);
    press(e);
    if(display.value === "") {
      display.value = "0";
    }
  }
});

addEventListener("keyup", e => {
  press(e);
});