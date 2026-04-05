// Selecting the button, input field, and result display element from the DOM
const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const breakdownEl = document.getElementById("breakdown");

// Function to calculate age based on user input
function calculateAge() {
  const birthdayValue = birthdayEl.value;

  if (birthdayValue === "") {
    alert("Please enter your birthday");
    return;
  }

  const age = getAge(birthdayValue);
  resultEl.innerText = `Your age is ${age.years} ${age.years > 1 ? "years" : "year"} old`;

  // Detailed breakdown
  breakdownEl.innerHTML = `
    Total days: ${age.totalDays} <br>
    Total weeks: ${age.totalWeeks} <br>
    Total hours: ${age.totalHours} <br>
    Total minutes: ${age.totalMinutes}
  `;
}

// Function to determine the user's age from their birthdate
function getAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);

  let ageYears = currentDate.getFullYear() - birthdayDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthdayDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthdayDate.getDate())) {
    ageYears--;
  }

  // Detailed breakdown calculations
  const diffMilliseconds = currentDate - birthdayDate;
  const totalDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMilliseconds / (1000 * 60));

  return {
    years: ageYears,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes
  };
}

// Adding an event listener to the button to trigger the age calculation on click
btnEl.addEventListener("click", calculateAge);