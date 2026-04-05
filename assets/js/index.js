const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");
const reminderBtn = document.getElementById("reminderBtn");

// 🌙 Dark/Light Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// 🎂 Calculate Age
function calculateAge() {
  const birthdayValue = birthdayEl.value;

  if (!birthdayValue) {
    alert("Please enter your birthday");
    return;
  }

  const data = getDetailedAge(birthdayValue);

  resultEl.innerHTML = `
    <p><strong>Age:</strong> ${data.years} years</p>
    <p>📅 Months: ${data.months}</p>
    <p>📆 Days: ${data.days}</p>
    <p>⏰ Hours: ${data.hours}</p>
    <p>⏱ Minutes: ${data.minutes}</p>
  `;
}

// 📊 Detailed Age Breakdown
function getDetailedAge(birthdayValue) {
  const now = new Date();
  const birth = new Date(birthdayValue);

  const diff = now - birth;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  return { years, months, days, hours, minutes };
}

// 🔔 Birthday Reminder (basic local check)
reminderBtn.addEventListener("click", () => {
  const birthdayValue = birthdayEl.value;

  if (!birthdayValue) {
    alert("Enter your birthday first!");
    return;
  }

  localStorage.setItem("birthday", birthdayValue);
  alert("Birthday reminder set! 🎉 (Works when you revisit the page)");
});

// Check reminder on load
window.addEventListener("load", () => {
  const savedBirthday = localStorage.getItem("birthday");

  if (savedBirthday) {
    const today = new Date();
    const birth = new Date(savedBirthday);

    if (
      today.getDate() === birth.getDate() &&
      today.getMonth() === birth.getMonth()
    ) {
      alert("🎉 Happy Birthday!");
    }
  }
});

// Event Listener
btnEl.addEventListener("click", calculateAge);