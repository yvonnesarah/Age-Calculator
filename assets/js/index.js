// Selecting the button, input field, and result display element from the DOM
const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");

// Function to calculate age based on user input
function calculateAge() {
  // Getting the value from the date input field
  const birthdayValue = birthdayEl.value;

  // Checking if the input field is empty
  if (birthdayValue === "") {
    alert("Please enter your birthday"); // Alerting user if no date is entered
  } else {
    // Calculating age using the getAge function
    const age = getAge(birthdayValue);
    // Displaying the calculated age in the result paragraph
    resultEl.innerText = `Your age is ${age} ${age > 1 ? "years" : "year"} old`;
  }
}

// Function to determine the user's age from their birthdate
function getAge(birthdayValue) {
  const currentDate = new Date(); // Getting the current date
  const birthdayDate = new Date(birthdayValue); // Converting input value to a date object
  let age = currentDate.getFullYear() - birthdayDate.getFullYear(); // Calculating initial age
  const month = currentDate.getMonth() - birthdayDate.getMonth(); // Checking the month difference

  // Adjusting age if the birthday hasn't occurred yet in the current year
  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthdayDate.getDate())
  ) {
    age--; // Reducing age by 1 if the birthday hasn't passed yet
  }

  return age; // Returning the calculated age
}

// Adding an event listener to the button to trigger the age calculation on click
btnEl.addEventListener("click", calculateAge);
