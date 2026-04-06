const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const breakdownEl = document.getElementById("breakdown");
const zodiacEl = document.getElementById("zodiac");
const planetaryEl = document.getElementById("planetary");
const insightsEl = document.getElementById("insights");
const nextBirthdayEl = document.getElementById("nextBirthday");
const lifeProgressEl = document.getElementById("lifeProgress");
const shareBtn = document.getElementById("shareBtn");

const famousBirthdaysUl = document.getElementById("famousBirthdays");

let interval;

// ------------------- ZODIAC & PLANETS -------------------
const zodiacSigns = [
  { sign: "Capricorn ♑", start: "12-22", end: "01-19", traits: "Responsible, disciplined" },
  { sign: "Aquarius ♒", start: "01-20", end: "02-18", traits: "Innovative, humanitarian" },
  { sign: "Pisces ♓", start: "02-19", end: "03-20", traits: "Empathetic, artistic" },
  { sign: "Aries ♈", start: "03-21", end: "04-19", traits: "Courageous, confident" },
  { sign: "Taurus ♉", start: "04-20", end: "05-20", traits: "Reliable, patient" },
  { sign: "Gemini ♊", start: "05-21", end: "06-20", traits: "Adaptable, curious" },
  { sign: "Cancer ♋", start: "06-21", end: "07-22", traits: "Emotional, nurturing" },
  { sign: "Leo ♌", start: "07-23", end: "08-22", traits: "Confident, ambitious" },
  { sign: "Virgo ♍", start: "08-23", end: "09-22", traits: "Analytical, kind" },
  { sign: "Libra ♎", start: "09-23", end: "10-22", traits: "Diplomatic, charming" },
  { sign: "Scorpio ♏", start: "10-23", end: "11-21", traits: "Passionate, resourceful" },
  { sign: "Sagittarius ♐", start: "11-22", end: "12-21", traits: "Optimistic, adventurous" },
];

const planets = [
  { name: "Mercury ☿", period: 0.24 },
  { name: "Venus ♀", period: 0.62 },
  { name: "Mars ♂", period: 1.88 },
  { name: "Jupiter ♃", period: 11.86 },
  { name: "Saturn ♄", period: 29.46 },
];

const monthNames = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

// ------------------- AGE CALCULATION -------------------
function calculateAgeData(birthdayValue) {
  const now = new Date();
  const birthdayDate = new Date(birthdayValue);
  let ageYears = now.getFullYear() - birthdayDate.getFullYear();
  const monthDiff = now.getMonth() - birthdayDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdayDate.getDate())) ageYears--;

  const diffMs = now - birthdayDate;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);

  let nextBD = new Date(now.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
  if (nextBD < now) nextBD.setFullYear(now.getFullYear() + 1);
  const diffNextBD = nextBD - now;
  const daysToBD = Math.floor(diffNextBD / (1000 * 60 * 60 * 24));
  const hoursToBD = Math.floor((diffNextBD / (1000 * 60 * 60)) % 24);
  const minutesToBD = Math.floor((diffNextBD / (1000 * 60)) % 60);
  const secondsToBD = Math.floor((diffNextBD / 1000) % 60);

  const monthDay = `${String(birthdayDate.getMonth()+1).padStart(2,'0')}-${String(birthdayDate.getDate()).padStart(2,'0')}`;
  const zodiac = zodiacSigns.find(z => z.start > z.end ? monthDay >= z.start || monthDay <= z.end : monthDay >= z.start && monthDay <= z.end);

  const planetaryAges = planets.map(p => `${p.name}: ${(ageYears / p.period).toFixed(2)} y`).join(" | ");

  const dayOfWeek = birthdayDate.toLocaleDateString('en-US', { weekday: 'long' });
  const sleepYears = ((totalHours/24)*0.33/365).toFixed(1);
  const blinkTimes = Math.floor(totalDays * 15000);

  const lifeExpectancy = 80;
  const lifeProgress = Math.min((ageYears / lifeExpectancy) * 100, 100);

  return {
    ageYears, totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds,
    nextBirthday: `${daysToBD}d ${hoursToBD}h ${minutesToBD}m ${secondsToBD}s`,
    zodiac: `${zodiac.sign} – Personality Traits: ${zodiac.traits}`,
    planetaryAges,
    insights: `Born on a ${dayOfWeek}. You've slept ~${sleepYears}y and blinked ~${blinkTimes} times.`,
    lifeProgress,
    month: birthdayDate.getMonth() + 1,
    day: birthdayDate.getDate()
  };
}

// ------------------- LIFE PROGRESS COLOR -------------------
function getLifeProgressColor(progress) {
  if (progress < 25) return "#4caf50";
  if (progress < 50) return "#ffeb3b";
  if (progress < 75) return "#ff9800";
  return "#f44336";
}

// ------------------- DAY IN HISTORY API (FAMOUS BIRTHDAYS ONLY) -------------------
async function fetchFamousBirthdays(month, day) {
  famousBirthdaysUl.innerHTML = "<li>Loading famous birthdays...</li>";
  try {
    const monthName = monthNames[month - 1];
    const res = await fetch(`https://api.dayinhistory.dev/v1/births/${monthName}/${day}/`);
    const data = await res.json();
    famousBirthdaysUl.innerHTML = "";
    if (data.results?.length) {
      data.results.forEach(item => {
        famousBirthdaysUl.innerHTML += `<li>${item.birth_year}: <strong>${item.name}</strong> — ${item.description}</li>`;
      });
    } else {
      famousBirthdaysUl.innerHTML = "<li>No famous birthdays found for this date.</li>";
    }
  } catch {
    famousBirthdaysUl.innerHTML = "<li>Could not fetch famous birthdays.</li>";
  }
}

// ------------------- LIVE AGE COUNTER -------------------
function startLiveCounter() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (!birthdayEl.value) return;
    const data = calculateAgeData(birthdayEl.value);

    resultEl.innerText = `Your age is ${data.ageYears} ${data.ageYears > 1 ? "years" : "year"} old`;
    breakdownEl.innerHTML = `Days: ${data.totalDays} | Weeks: ${data.totalWeeks} | Hours: ${data.totalHours} | Minutes: ${data.totalMinutes} | Seconds: ${data.totalSeconds}`;
    zodiacEl.innerText = `Zodiac: ${data.zodiac}`;
    planetaryEl.innerText = `Age on planets: ${data.planetaryAges}`;
    insightsEl.innerText = `Fun insights: ${data.insights}`;
    nextBirthdayEl.innerText = `Next birthday in: ${data.nextBirthday} 🎉`;

    lifeProgressEl.style.width = `${data.lifeProgress}%`;
    lifeProgressEl.style.background = getLifeProgressColor(data.lifeProgress);
  }, 1000);
}

// ------------------- BUTTON EVENTS -------------------
btnEl.addEventListener("click", () => {
  if (!birthdayEl.value) { alert("Please enter your date."); return; }

  startLiveCounter();

  const data = calculateAgeData(birthdayEl.value);
  fetchFamousBirthdays(data.month, data.day);
});

shareBtn.addEventListener("click", () => {
  const textToCopy = `
${resultEl.innerText}
${breakdownEl.innerText}
${zodiacEl.innerText}
${planetaryEl.innerText}
${insightsEl.innerText}
${nextBirthdayEl.innerText}
Famous birthdays loaded!
  `;
  navigator.clipboard.writeText(textToCopy);
  alert("Copied! 📋");
});