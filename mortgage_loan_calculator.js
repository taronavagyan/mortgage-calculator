/*
 * START
 * GET the loan amount
 * GET the APR
 * GET the loan duration in years
 * SET loanDurationInMonths to loanDuration / 12
 * SET monthlyInterestRate to APR / 12
 * SET monthlyPayments
 * RETURN monthlyInterestRate and loanDurationInMonths
 * END
 */
const readline = require("readline-sync");

function prompt(message) {
  console.log(`> ${message}`);
}

function getLoanAmount() {
  prompt("What size loan would you like? (USD)");
  let loanAmount = Number(readline.question("$"));

  while (loanAmount <= 0 || Number.isNaN(loanAmount)) {
    prompt("Something seems off... Try re-entering the loan amount.");
    loanAmount = Number(readline.question("$"));
  }
  return loanAmount;
}

function getMonthlyInterest() {
  prompt("What is the annual interest rate (APR)?");
  prompt("Example: 10 for 10% or 3.5 or 3.5%");
  let yearlyInterest = readline.question();

  if (yearlyInterest[yearlyInterest.length - 1] === "%") {
    yearlyInterest = Number(yearlyInterest.slice(0, -1));
  }

  while (
    yearlyInterest < 0 ||
    yearlyInterest.trimStart() === "" ||
    isNaN(yearlyInterest)
  ) {
    prompt("Please provide a positive interest rate.");
    yearlyInterest = readline.question();
  }
  let monthlyInterest = yearlyInterest / 100 / 12;
  return monthlyInterest;
}

// eslint-disable-next-line max-lines-per-function
function getLoanDuration() {
  prompt("How many years and months would you like the loan to be for?");
  let loanDurationFullYears = Number(
    readline.question("Years (Press Enter for 0): ")
  );
  let loanDurationExtraMonths = Number(
    readline.question("Months (Press Enter for 0): ")
  );

  while (
    (loanDurationFullYears < 1 && loanDurationExtraMonths < 1) ||
    loanDurationFullYears < 0 ||
    loanDurationExtraMonths < 0 ||
    isNaN(loanDurationFullYears) ||
    isNaN(loanDurationExtraMonths)
  ) {
    prompt("Invalid input. Enter a new loan term.");
    loanDurationFullYears =
      "" + readline.question("Years (Press Enter for 0): ");
    loanDurationExtraMonths =
      "" + readline.question("Months (Press Enter for 0): ");
  }
  //prettier-ignore
  return (loanDurationFullYears * 12) + Number(loanDurationExtraMonths);
}

function calculateMonthlyPayments(
  loanAmount,
  monthlyInterest,
  loanDurationInMonths
) {
  let monthlyPayments = (
    loanAmount *
    (monthlyInterest /
      (1 - Math.pow(1 + monthlyInterest, -loanDurationInMonths)))
  ).toFixed(2);
  return monthlyPayments;
}

function restart() {
  let choice;
  prompt("Would you like to do another calculation?");
  while (!["y", "n", "yes", "no"].includes(choice)) {
    prompt("Please enter: 'y' or 'n'");
    choice = readline.question().toLowerCase();
    if (choice === "y" || choice === "yes") {
      console.clear();
      start();
    } else if (choice === "n" || choice === "no") {
      prompt("Thank you for using Mortgage Calculator!");
    }
  }
}

console.clear();
prompt("Welcome to Mortgage Calculator!");
function start() {
  console.log("-------------------------------------------------");
  let loanAmount = getLoanAmount();
  let monthlyInterest = getMonthlyInterest();
  let loanDurationInMonths = getLoanDuration();
  let monthlyPayments = calculateMonthlyPayments(
    loanAmount,
    monthlyInterest,
    loanDurationInMonths
  );

  prompt(`Your payments for this loan would be $${monthlyPayments} per month.`);
  restart();
}

start();
