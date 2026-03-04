const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.id;
    const value = btn.innerText;

    if (btn.id === "clear") {
      clear();
      return;
    }

    if (btn.id === "clear-entry") {
      display.innerText = display.innerText.slice(0, -1);
      return;
    }

    if (id === "equals") {
      secondNumber = display.innerText;
      display.innerText = calculate();
      return;
    }
    if (id === "backspace") {
      display.innerText =
        display.innerText.length > 1 ? display.innerText.slice(0, -1) : "0";
      return;
    }

    if (["add", "subtract", "multiply", "divide", "percent"].includes(id)) {
      operator = id;
      firstNumber = display.innerText;
      display.innerText = "0";
      return;
    }
    if (btn.classList.contains("digit")) {
      if (value === "." && display.innerText.includes(".")) return;
      if (display.innerText === "0") display.innerText = value;
      else display.innerText += value;
      return;
    }
  });
});

window.addEventListener("keydown", (e) => {
  let targetId = "";

  switch (e.key) {
    // Numbers
    case "0":
      targetId = "zero";
      break;
    case "1":
      targetId = "one";
      break;
    case "2":
      targetId = "two";
      break;
    case "3":
      targetId = "three";
      break;
    case "4":
      targetId = "four";
      break;
    case "5":
      targetId = "five";
      break;
    case "6":
      targetId = "six";
      break;
    case "7":
      targetId = "seven";
      break;
    case "8":
      targetId = "eight";
      break;
    case "9":
      targetId = "nine";
      break;

    // Operations
    case ".":
      targetId = "decimal";
      break;
    case "+":
      targetId = "add";
      break;
    case "-":
      targetId = "subtract";
      break;
    case "*":
      targetId = "multiply";
      break;
    case "/":
      targetId = "divide";
      break;
    case "%":
      targetId = "percent";
      break;

    // Actions
    case "=":
    case "Enter":
      e.preventDefault();
      targetId = "equals";
      break;
    case "Backspace":
      targetId = "clear-entry";
      break; // Matches your CE button
    case "Escape":
      targetId = "clear";
      break; // Matches your AC button
    default:
      return;
  }

  const btn = document.getElementById(targetId);
  if (btn) {
    btn.click();
  }
});

let firstNumber = "";
let secondNumber = "";
let operator = "";

function clear() {
  display.innerText = "0";
  firstNumber = "";
  secondNumber = "";
  operator = "";
}

function calculate() {
  let result;
  let number1 = parseFloat(firstNumber);
  let number2 = parseFloat(secondNumber);

  if (operator === "add") {
    result = number1 + number2;
  } else if (operator === "subtract") {
    result = number1 - number2;
  } else if (operator === "multiply") {
    result = number1 * number2;
  } else if (operator === "divide") {
    // Bonus: check for division by zero!
    result = number2 === 0 ? "Error" : number1 / number2;
  } else if (operator === "percent") {
    result = number1 % number2;
  } else {
    return display.innerText; // Fallback if no operator was set
  }

  return result.toString();
}
