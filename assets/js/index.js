// ------------------- DOM ELEMENTS -------------------
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
const themeBtn = document.getElementById("themeBtn");
const lifeStatsEl = document.getElementById("lifeStats");

let interval;

// ------------------- ZODIAC & PLANETS -------------------
const zodiacSigns = [
  { sign: "Capricorn ♑", start: "12-22", end: "01-19", traits: "Responsible, disciplined", element: "Earth", modality: "Cardinal", compatible: ["Taurus", "Virgo"], challenging: ["Aries", "Libra"] },
  { sign: "Aquarius ♒", start: "01-20", end: "02-18", traits: "Innovative, humanitarian", element: "Air", modality: "Fixed", compatible: ["Gemini", "Libra"], challenging: ["Taurus", "Scorpio"] },
  { sign: "Pisces ♓", start: "02-19", end: "03-20", traits: "Empathetic, artistic", element: "Water", modality: "Mutable", compatible: ["Cancer", "Scorpio"], challenging: ["Gemini", "Sagittarius"] },
  { sign: "Aries ♈", start: "03-21", end: "04-19", traits: "Courageous, confident", element: "Fire", modality: "Cardinal", compatible: ["Leo", "Sagittarius"], challenging: ["Cancer", "Capricorn"] },
  { sign: "Taurus ♉", start: "04-20", end: "05-20", traits: "Reliable, patient", element: "Earth", modality: "Fixed", compatible: ["Virgo", "Capricorn"], challenging: ["Leo", "Aquarius"] },
  { sign: "Gemini ♊", start: "05-21", end: "06-20", traits: "Adaptable, curious", element: "Air", modality: "Mutable", compatible: ["Libra", "Aquarius"], challenging: ["Virgo", "Pisces"] },
  { sign: "Cancer ♋", start: "06-21", end: "07-22", traits: "Emotional, nurturing", element: "Water", modality: "Cardinal", compatible: ["Scorpio", "Pisces"], challenging: ["Aries", "Libra"] },
  { sign: "Leo ♌", start: "07-23", end: "08-22", traits: "Confident, ambitious", element: "Fire", modality: "Fixed", compatible: ["Aries", "Sagittarius"], challenging: ["Taurus", "Scorpio"] },
  { sign: "Virgo ♍", start: "08-23", end: "09-22", traits: "Analytical, kind", element: "Earth", modality: "Mutable", compatible: ["Taurus", "Capricorn"], challenging: ["Gemini", "Sagittarius"] },
  { sign: "Libra ♎", start: "09-23", end: "10-22", traits: "Diplomatic, charming", element: "Air", modality: "Cardinal", compatible: ["Gemini", "Aquarius"], challenging: ["Cancer", "Capricorn"] },
  { sign: "Scorpio ♏", start: "10-23", end: "11-21", traits: "Passionate, resourceful", element: "Water", modality: "Fixed", compatible: ["Cancer", "Pisces"], challenging: ["Leo", "Aquarius"] },
  { sign: "Sagittarius ♐", start: "11-22", end: "12-21", traits: "Optimistic, adventurous", element: "Fire", modality: "Mutable", compatible: ["Aries", "Leo"], challenging: ["Virgo", "Pisces"] },
];

function getZodiacInsight(sign, ageYears) {
  const tips = {
    Fire: [
      "🔥 Take bold action today — momentum is your strength.",
      "⚡ Channel your energy into something meaningful."
    ],
    Earth: [
      "🌱 Focus on stability and long-term goals.",
      "🏗 Small consistent steps will build success."
    ],
    Air: [
      "💡 Communicate your ideas — they matter.",
      "🌬 Stay flexible and open-minded today."
    ],
    Water: [
      "🌊 Trust your intuition.",
      "💙 Emotional awareness is your superpower."
    ]
  };

  const ageBased = ageYears < 25
    ? "🚀 This is your exploration phase — take risks."
    : ageYears < 50
    ? "🎯 Focus on mastery and consistency."
    : "🧘 Prioritize balance, health, and legacy.";

  const randomTip = tips[sign.element][Math.floor(Math.random() * tips[sign.element].length)];

  return `${randomTip} <br>${ageBased}`;
}

const planets = [
  { name: "Mercury ☿", period: 0.24 },
  { name: "Venus ♀", period: 0.62 },
  { name: "Mars ♂", period: 1.88 },
  { name: "Jupiter ♃", period: 11.86 },
  { name: "Saturn ♄", period: 29.46 },
];

const birthdayFunFacts = {
  "04-07": [
    "🌐 1969 – The Internet's first message was sent.",
    "🎬 Jackie Chan (actor) was born on this day."
  ],
  "01-01": [
    "🎆 New Year's Day celebrated worldwide.",
    "🎤 Many iconic artists released debut albums on this date."
  ],
  "12-25": [
    "🎄 Christmas is celebrated globally.",
    "🎶 Famous holiday songs dominate charts every year."
  ]
};

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

if (nextBD < now) {
  nextBD.setFullYear(now.getFullYear() + 1);
}

const diff = nextBD - now;

const daysToBD = Math.floor(diff / (1000 * 60 * 60 * 24));
const hoursToBD = Math.floor((diff / (1000 * 60 * 60)) % 24);
const minutesToBD = Math.floor((diff / (1000 * 60)) % 60);
const secondsToBD = Math.floor((diff / 1000) % 60);

// 🎂 Birthday check
const isBirthday =
  now.getDate() === birthdayDate.getDate() &&
  now.getMonth() === birthdayDate.getMonth();

  const monthDay = `${String(birthdayDate.getMonth()+1).padStart(2,'0')}-${String(birthdayDate.getDate()).padStart(2,'0')}`;
  const zodiac = zodiacSigns.find(z => z.start > z.end ? monthDay >= z.start || monthDay <= z.end : monthDay >= z.start && monthDay <= z.end);

  const planetaryAges = planets.map(p => `${p.name}: ${(ageYears / p.period).toFixed(2)} y`).join(" | ");
  const dayOfWeek = birthdayDate.toLocaleDateString('en-US', { weekday: 'long' });
  const sleepYears = ((totalHours/24)*0.33/365).toFixed(1);
  const blinkTimes = Math.floor(totalDays * 15000);
  const lifeExpectancy = 80;
  const lifeProgress = Math.min((ageYears / lifeExpectancy) * 100, 100);

  // Dog & cat years
  const dogYears = (ageYears * 7).toFixed(1);
  const catYears = (ageYears * 6).toFixed(1);

  return {
    ageYears, totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds,
    nextBirthdayData: {
  days: daysToBD,
  hours: hoursToBD,
  minutes: minutesToBD,
  seconds: secondsToBD,
  isBirthday
},
    zodiac: zodiac.sign,
zodiacDetails: `
Traits: ${zodiac.traits}
<br>Element: ${zodiac.element}
<br>Modality: ${zodiac.modality}
<br><br>💞 Compatible: ${zodiac.compatible.join(", ")}
<br>⚠️ Challenging: ${zodiac.challenging.join(", ")}
`,
zodiacInsight: getZodiacInsight(zodiac, ageYears),
    planetaryAges,
    insights: `Born on a ${dayOfWeek}. You've slept ~${sleepYears}y and blinked ~${blinkTimes} times.`,
    lifeProgress,
    monthDay,
    dogYears,
    catYears
  };
}

function calculateAdvancedMetrics(totalDays) {
  const averageBPM = 72;

  // --- HEART ---
  const totalMinutesLived = totalDays * 24 * 60;
  const heartbeats = Math.floor(totalMinutesLived * averageBPM);

  // --- SLEEP ---
  const totalSleepHours = totalDays * 8;

  const sleepCycles = Math.floor(totalSleepHours / 1.5); // 90 min cycles
  const deepSleep = Math.floor(totalSleepHours * 0.25);
  const remSleep = Math.floor(totalSleepHours * 0.20);
  const lightSleep = Math.floor(totalSleepHours * 0.55);

  // --- BLINK ---
  const blinksPerDay = 15000;
  const blinkCount = totalDays * blinksPerDay;
  const blinksPerHour = Math.floor(blinksPerDay / 16); // assuming 16h awake

  // --- EXTRA LIFE METRICS ---
  const avgStepsPerDay = 7000;
  const stepsWalked = totalDays * avgStepsPerDay;

  const caloriesPerDay = 2000;
  const caloriesBurned = totalDays * caloriesPerDay;

  const workingHours = Math.floor(totalDays * 8);
  const scrollingHours = Math.floor(totalDays * 2.5);

  // --- PRODUCTIVITY INSIGHT ---
  let productivityInsight = "";
  if (sleepCycles > 10000) {
    productivityInsight = "🧠 Excellent long-term recovery & brain performance.";
  } else {
    productivityInsight = "⚡ Your sleep consistency directly impacts focus & energy.";
  }

  // --- MILESTONES ---
  const milestones = [];
  if (totalDays >= 10000) milestones.push("🎉 10,000 days milestone reached!");
  if (totalDays >= 20000) milestones.push("🔥 20,000 days — Legendary consistency!");
  if (totalDays >= 50000) milestones.push("🚀 50,000 days — Lifetime elite!");

  return {
    heartbeats,
    totalSleepHours,
    sleepCycles,
    deepSleep,
    remSleep,
    lightSleep,
    blinkCount,
    blinksPerHour,
    stepsWalked,
    caloriesBurned,
    workingHours,
    scrollingHours,
    productivityInsight,
    milestones
  };
}

function getLifeProgressColor(progress) {
  if (progress < 25) return "#4caf50";
  if (progress < 50) return "#ffeb3b";
  if (progress < 75) return "#ff9800";
  return "#f44336";
}

// ------------------- LIVE COUNTER -------------------
function startLiveCounter() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (!birthdayEl.value) return;
    const data = calculateAgeData(birthdayEl.value);
    const advMetrics = calculateAdvancedMetrics(data.totalDays);

    // Age & breakdown
    resultEl.innerText = `Your age is ${data.ageYears} ${data.ageYears > 1 ? "years" : "year"} old`;
    breakdownEl.innerHTML = `Days: ${data.totalDays} | Weeks: ${data.totalWeeks} | Hours: ${data.totalHours} | Minutes: ${data.totalMinutes} | Seconds: ${data.totalSeconds}`;

    // Zodiac & planetary
    zodiacEl.innerHTML = `
🌌 <b>Zodiac:</b> ${data.zodiac}
<br>${data.zodiacDetails}
<br><br>🧠 <b>Daily Insight:</b>
<br>${data.zodiacInsight}
`;
    planetaryEl.innerText = `Age on planets: ${data.planetaryAges}`;

    // Insights
    insightsEl.innerHTML = `
${data.insights}

<br><br>❤️ <b>Heart Activity</b>
<br>Heartbeats: ${advMetrics.heartbeats.toLocaleString()}

<br><br>💤 <b>Sleep Intelligence</b>
<br>Total Sleep: ${advMetrics.totalSleepHours.toLocaleString()} hrs
<br>Cycles: ${advMetrics.sleepCycles.toLocaleString()}
<br>Deep: ${advMetrics.deepSleep}h | REM: ${advMetrics.remSleep}h | Light: ${advMetrics.lightSleep}h

<br><br>👁️ <b>Blink Analytics</b>
<br>Total Blinks: ${advMetrics.blinkCount.toLocaleString()}
<br>Blinks/hour: ${advMetrics.blinksPerHour}

<br><br>📊 <b>Life Productivity</b>
<br>${advMetrics.productivityInsight}

<br><br>🐶 Dog years: ${data.dogYears}
<br>🐱 Cat years: ${data.catYears}
`;

lifeStatsEl.innerHTML += `
<br>🚶 Steps walked: ${advMetrics.stepsWalked.toLocaleString()}
<br>🔥 Calories burned: ${advMetrics.caloriesBurned.toLocaleString()}
<br>💼 Work hours: ${advMetrics.workingHours.toLocaleString()}
<br>📱 Screen scroll hours: ${advMetrics.scrollingHours.toLocaleString()}
`;
    // Next birthday + fun fact
   const bd = data.nextBirthdayData;

// 🎉 Birthday Mode
if (bd.isBirthday) {
  nextBirthdayEl.innerHTML = `
  🎂 <b>HAPPY BIRTHDAY!!!</b> 🎉
  <br>Today is your special day — celebrate it! 🥳
  `;
} else {
  nextBirthdayEl.innerHTML = `
  ⏳ <b>Next Birthday Countdown</b>
  <br>${bd.days}d ${bd.hours}h ${bd.minutes}m ${bd.seconds}s
  `;
}

// 🎁 Fun Fact (randomized)
const facts = birthdayFunFacts[data.monthDay];
if (facts) {
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  nextBirthdayEl.innerHTML += `<br><br>🎁 <b>On your birthday:</b><br>${randomFact}`;
}

    // Life stats
    lifeStatsEl.innerHTML = `🍽 Meals eaten (3/day): ${(data.totalDays*3).toLocaleString()}<br>🌅 Sunsets seen: ${data.totalDays.toLocaleString()}`;

    // Life progress bar
    lifeProgressEl.style.width = `${data.lifeProgress}%`;
    lifeProgressEl.style.background = getLifeProgressColor(data.lifeProgress);

  }, 1000);
}

// ------------------- EVENT LISTENERS -------------------
btnEl.addEventListener("click", () => {
  if (!birthdayEl.value) { alert("Please enter your date."); return; }
  startLiveCounter();
});

shareBtn.addEventListener("click", () => {
  const textToCopy = `${resultEl.innerText}\n${breakdownEl.innerText}\n${zodiacEl.innerText}\n${planetaryEl.innerText}\n${insightsEl.innerText}\n${nextBirthdayEl.innerText}`;
  navigator.clipboard.writeText(textToCopy);
  alert("Copied! 📋");
});

// ------------------- DARK / LIGHT MODE -------------------
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}
