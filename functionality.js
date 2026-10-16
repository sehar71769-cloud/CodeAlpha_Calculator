
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".buttons button");

let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;

// Handle calculator button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // Clear everything
        if (value === "AC") {
            display.value = "0";
            firstNumber = null;
            operator = null;
            shouldResetDisplay = false;
            return;
        }

        // Delete the last digit
        if (value === "DEL") {
            if (display.value === "Error" || shouldResetDisplay) {
                display.value = "0";
                shouldResetDisplay = false;
            } else {
                display.value = display.value.slice(0, -1) || "0";
            }
            return;
        }

        // Enter a number
        if ("0123456789".includes(value)) {
            if (display.value === "0" || display.value === "Error" || shouldResetDisplay) {
                display.value = value;
                shouldResetDisplay = false;
            } else {
                display.value += value;
            }
            return;
        }

        // Enter a decimal point
        if (value === ".") {
            if (display.value === "Error" || shouldResetDisplay) {
                display.value = "0";
                shouldResetDisplay = false;
            }

            if (!display.value.includes(".")) {
                display.value += ".";
            }
            return;
        }

        // Choose an operator
        if (["+", "−", "×", "÷"].includes(value)) {
            firstNumber = Number(display.value);
            operator = value;
            shouldResetDisplay = true;
            return;
        }

        // Calculate the result
        if (value === "=") {
            if (operator === null || firstNumber === null || display.value === "Error") {
                return;
            }

            const secondNumber = Number(display.value);
            let result;

            if (operator === "+") {
                result = firstNumber + secondNumber;
            } else if (operator === "−") {
                result = firstNumber - secondNumber;
            } else if (operator === "×") {
                result = firstNumber * secondNumber;
            } else if (operator === "÷") {
                if (secondNumber === 0) {
                    display.value = "Error";
                    firstNumber = null;
                    operator = null;
                    shouldResetDisplay = true;
                    return;
                }

                result = firstNumber / secondNumber;
            }

            display.value = String(Number(result.toPrecision(10)));
            firstNumber = null;
            operator = null;
            shouldResetDisplay = true;
        }
    });
});
