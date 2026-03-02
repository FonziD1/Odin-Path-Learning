/**
 * Calculator logic that separates the 1st value, operator, and 2nd value.
 */
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  /**
   * Resets all values to their initial state.
   */
  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  /**
   * Removes the last digit from the current input.
   */
  delete() {
    if (this.currentOperand === "0") return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") this.currentOperand = "0";
  }

  /**
   * Appends a number to the current value.
   */
  appendNumber(number) {
    // Prevent multiple decimal points
    if (number === "." && this.currentOperand.includes(".")) return;

    // Handle initial zero
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  /**
   * Sets the operator and moves the current value to the 1st value position.
   */
  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    // If there is already a 1st value and an operator, compute first
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand; // This is the 1st value
    this.currentOperand = ""; // Clear for the 2nd value
  }

  /**
   * Performs the math computation between 1st value and 2nd value.
   */
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        if (current === 0) {
          alert("Cannot divide by zero!");
          this.clear();
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  /**
   * Updates the text labels in the UI.
   */
  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = "";
    }
  }
}

// Select elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandElement = document.getElementById("previous-operand");
const currentOperandElement = document.getElementById("current-operand");

// Initialize Calculator
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement,
);

// Add Event Listeners
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.getAttribute("data-number"));
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.getAttribute("data-operator"));
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Keyboard Support
window.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) calculator.appendNumber(e.key);
  if (e.key === ".") calculator.appendNumber(".");
  if (e.key === "=" || e.key === "Enter") calculator.compute();
  if (e.key === "Backspace") calculator.delete();
  if (e.key === "Escape") calculator.clear();
  if (["+", "-", "*", "/"].includes(e.key)) calculator.chooseOperation(e.key);
  calculator.updateDisplay();
});
