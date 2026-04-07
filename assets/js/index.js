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
const planetChartCanvas = document.getElementById("planetChart");

let interval;
let currentInsights = [];
let lastDate = "";
let planetChartInstance = null;

// ------------------- PLANET ICONS -------------------
const planetIcons = {
  "Mercury ☿": "☿",
  "Venus ♀": "♀",
  "Mars ♂": "♂",
  "Jupiter ♃": "♃",
  "Saturn ♄": "♄"
};

// ------------------- ZODIAC & PLANETS -------------------
const zodiacSigns = [
  { sign: "Capricorn ♑", start: "12-22", end: "01-19", traits: "Responsible, disciplined", element:"Earth", modality:"Cardinal" },
  { sign: "Aquarius ♒", start: "01-20", end: "02-18", traits: "Innovative, humanitarian", element:"Air", modality:"Fixed" },
  { sign: "Pisces ♓", start: "02-19", end: "03-20", traits: "Empathetic, artistic", element:"Water", modality:"Mutable" },
  { sign: "Aries ♈", start: "03-21", end: "04-19", traits: "Courageous, confident", element:"Fire", modality:"Cardinal" },
  { sign: "Taurus ♉", start: "04-20", end: "05-20", traits: "Reliable, patient", element:"Earth", modality:"Fixed" },
  { sign: "Gemini ♊", start: "05-21", end: "06-20", traits: "Adaptable, curious", element:"Air", modality:"Mutable" },
  { sign: "Cancer ♋", start: "06-21", end: "07-22", traits: "Emotional, nurturing", element:"Water", modality:"Cardinal" },
  { sign: "Leo ♌", start: "07-23", end: "08-22", traits: "Confident, ambitious", element:"Fire", modality:"Fixed" },
  { sign: "Virgo ♍", start: "08-23", end: "09-22", traits: "Analytical, kind", element:"Earth", modality:"Mutable" },
  { sign: "Libra ♎", start: "09-23", end: "10-22", traits: "Diplomatic, charming", element:"Air", modality:"Cardinal" },
  { sign: "Scorpio ♏", start: "10-23", end: "11-21", traits: "Passionate, resourceful", element:"Water", modality:"Fixed" },
  { sign: "Sagittarius ♐", start: "11-22", end: "12-21", traits: "Optimistic, adventurous", element:"Fire", modality:"Mutable" },
];

const planets = [
  { name: "Mercury ☿", period: 0.24 },
  { name: "Venus ♀", period: 0.62 },
  { name: "Mars ♂", period: 1.88 },
  { name: "Jupiter ♃", period: 11.86 },
  { name: "Saturn ♄", period: 29.46 },
];

const birthdayFunFacts = {
  "04-07": "On this day in 1969, the Internet's first message was sent.",
  "01-01": "New Year's Day: Many cultures celebrate with fireworks."
};

// ------------------- COMPATIBILITY -------------------
function getZodiacCompatibility(zodiacSign) {
  const compatibility = {
    "Aries ♈": { compatible: ["Leo ♌","Sagittarius ♐"], challenging: ["Cancer ♋","Capricorn ♑"] },
    "Taurus ♉": { compatible: ["Virgo ♍","Capricorn ♑"], challenging: ["Leo ♌","Aquarius ♒"] },
    "Gemini ♊": { compatible: ["Libra ♎","Aquarius ♒"], challenging: ["Virgo ♍","Pisces ♓"] },
    "Cancer ♋": { compatible: ["Scorpio ♏","Pisces ♓"], challenging: ["Aries ♈","Libra ♎"] },
    "Leo ♌": { compatible: ["Aries ♈","Sagittarius ♐"], challenging: ["Taurus ♉","Scorpio ♏"] },
    "Virgo ♍": { compatible: ["Taurus ♉","Capricorn ♑"], challenging: ["Gemini ♊","Sagittarius ♐"] },
    "Libra ♎": { compatible: ["Gemini ♊","Aquarius ♒"], challenging: ["Cancer ♋","Capricorn ♑"] },
    "Scorpio ♏": { compatible: ["Cancer ♋","Pisces ♓"], challenging: ["Leo ♌","Aquarius ♒"] },
    "Sagittarius ♐": { compatible: ["Aries ♈","Leo ♌"], challenging: ["Virgo ♍","Pisces ♓"] },
    "Capricorn ♑": { compatible: ["Taurus ♉","Virgo ♍"], challenging: ["Aries ♈","Libra ♎"] },
    "Aquarius ♒": { compatible: ["Gemini ♊","Libra ♎"], challenging: ["Taurus ♉","Scorpio ♏"] },
    "Pisces ♓": { compatible: ["Cancer ♋","Scorpio ♏"], challenging: ["Gemini ♊","Sagittarius ♐"] },
  };
  return compatibility[zodiacSign] || { compatible: [], challenging: [] };
}

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

  const planetaryAges = planets.map(p => (ageYears / p.period).toFixed(2));
  const planetaryLabels = planets.map(p => p.name);

  const dayOfWeek = birthdayDate.toLocaleDateString('en-US', { weekday: 'long' });
  const sleepYears = ((totalHours/24)*0.33/365).toFixed(1);
  const blinkTimes = Math.floor(totalDays * 15000);
  const lifeExpectancy = 80;
  const lifeProgress = Math.min((ageYears / lifeExpectancy) * 100, 100);

  const dogYears = (ageYears * 7).toFixed(1);
  const catYears = (ageYears * 6).toFixed(1);

  return {
    ageYears, totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds,
    nextBirthday: `${daysToBD}d ${hoursToBD}h ${minutesToBD}m ${secondsToBD}s`,
    zodiac: `${zodiac.sign} – Personality Traits: ${zodiac.traits}`,
    zodiacDetails: `Element: ${zodiac.element} | Modality: ${zodiac.modality}`,
    planetaryAges, planetaryLabels,
    insights: `Born on a ${dayOfWeek}. You've slept ~${sleepYears}y and blinked ~${blinkTimes} times.`,
    lifeProgress, monthDay, dogYears, catYears
  };
}

// ------------------- ADVANCED METRICS -------------------
function calculateAdvancedMetrics(totalDays) {
  const averageBPM = 72;
  const heartbeats = Math.floor(totalDays * 24 * 60 * averageBPM);
  const sleepHours = Math.floor(totalDays * 8);
  const blinkCount = totalDays * 15000;
  const avgStepsPerDay = 7000;
  const stepsWalked = totalDays * avgStepsPerDay;
  const caloriesPerDay = 2000;
  const caloriesBurned = totalDays * caloriesPerDay;
  const milestones = [];
  if (totalDays >= 10000) milestones.push("🎉 10,000 days milestone reached!");
  if (totalDays >= 50000) milestones.push("🚀 50,000 days milestone reached!");
  return { heartbeats, sleepHours, blinkCount, stepsWalked, caloriesBurned, milestones };
}

// ------------------- DAILY INSIGHTS -------------------
function getZodiacInsight(zodiacData, ageYears) {
  const tipsPool = {
    Fire: ["🔥 Take bold action today.","⚡ Channel energy meaningfully.","🌟 Express creativity.","🏹 Focus on goals."],
    Earth: ["🌱 Focus on stability and long-term goals.","🏗 Small consistent steps build success.","💼 Organize finances.","🛠 Improve skills."],
    Air: ["💡 Communicate your ideas.","🌬 Stay flexible and open-minded.","📚 Learn something new.","🗣 Network with others."],
    Water: ["🌊 Trust your intuition.","💙 Emotional awareness is key.","🧘 Practice mindfulness.","🎨 Explore art or music."]
  };
  const ageBased = ageYears < 25 ? "🚀 Exploration phase — take risks." : ageYears < 50 ? "🎯 Focus on mastery." : "🧘 Balance, health, legacy.";
  const pool = [...tipsPool[zodiacData.element], ageBased];
  let first = pool[Math.floor(Math.random()*pool.length)];
  let second; do { second = pool[Math.floor(Math.random()*pool.length)]; } while(second === first);
  return [first, second];
}

// ------------------- LIFE PROGRESS COLOR -------------------
function getLifeProgressColor(progress) {
  if(progress < 25) return "#4caf50";
  if(progress < 50) return "#ffeb3b";
  if(progress < 75) return "#ff9800";
  return "#f44336";
}

// ------------------- LIVE COUNTER -------------------
function startLiveCounter() {
  if(interval) clearInterval(interval);
  interval = setInterval(()=>{
    if(!birthdayEl.value) return;
    const data = calculateAgeData(birthdayEl.value);
    const advMetrics = calculateAdvancedMetrics(data.totalDays);

    // Age & breakdown
    resultEl.innerText = `Your age is ${data.ageYears} ${data.ageYears>1?"years":"year"} old`;
    breakdownEl.innerHTML = `Days: ${data.totalDays} | Weeks: ${data.totalWeeks} | Hours: ${data.totalHours} | Minutes: ${data.totalMinutes} | Seconds: ${data.totalSeconds}`;

    // Planetary chart (only redraw when date changes)
    if(birthdayEl.value !== lastDate){
      if(planetChartInstance) planetChartInstance.destroy();
      const ctx = planetChartCanvas.getContext('2d');
      planetChartInstance = new Chart(ctx,{
        type:'bar',
        data:{
          labels:data.planetaryLabels.map(l=>planetIcons[l]||l),
          datasets:[{ label:'Age on Planets (Years)', data:data.planetaryAges, backgroundColor:['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF'], borderColor:'#333', borderWidth:1}]
        },
        options:{
          responsive:true,
          plugins:{ legend:{display:false}, tooltip:{callbacks:{title:t=>data.planetaryLabels[t[0].dataIndex]}} },
          scales:{ x:{ticks:{font:{size:20}}}, y:{beginAtZero:true} },
          animation:false
        }
      });

      // Daily insights
      const zodiacData = zodiacSigns.find(z=>z.sign===data.zodiac.split(" – ")[0]);
      currentInsights = getZodiacInsight(zodiacData,data.ageYears);
      lastDate=birthdayEl.value;
    }

    // Zodiac + compatibility
    const zodiacName = data.zodiac.split(" – ")[0];
    const comp = getZodiacCompatibility(zodiacName);
    zodiacEl.innerHTML = `
      🌌 <b>Zodiac:</b> ${data.zodiac}<br>
      ${data.zodiacDetails}<br><br>
      🧠 <b>Daily Insight:</b><br>
      ${currentInsights[0]}<br>${currentInsights[1]}<br><br>
      💖 <b>Compatible Signs:</b> ${comp.compatible.join(", ")}<br>
      ⚡ <b>Challenging Signs:</b> ${comp.challenging.join(", ")}
    `;

    // Insights
    insightsEl.innerHTML=`${data.insights}<br> <br>❤️ Heartbeats: ${advMetrics.heartbeats.toLocaleString()}<br>💤 Sleep hours: ${advMetrics.sleepHours.toLocaleString()}<br>👁️ Blinks: ${advMetrics.blinkCount.toLocaleString()}<br>🐶 Dog years: ${data.dogYears}<br>🐱 Cat years: ${data.catYears}`;
    advMetrics.milestones.forEach(m=>insightsEl.innerHTML+=`<br>${m}`);

    // Next birthday (countdown only)
    nextBirthdayEl.innerHTML=`Next birthday in: ${data.nextBirthday} 🎉`;

    // Life stats
    lifeStatsEl.innerHTML=`🍽 Meals eaten (3/day): ${(data.totalDays*3).toLocaleString()}<br>🌅 Sunsets seen: ${data.totalDays.toLocaleString()}`;

    // Life progress bar
    lifeProgressEl.style.width=`${data.lifeProgress}%`;
    lifeProgressEl.style.background=getLifeProgressColor(data.lifeProgress);

  },1000);
}

// ------------------- EVENT LISTENERS -------------------
btnEl.addEventListener("click",()=>{ if(!birthdayEl.value){alert("Please enter your date.");return;} startLiveCounter(); });
shareBtn.addEventListener("click",()=>{ const textToCopy=`${resultEl.innerText}\n${breakdownEl.innerText}\n${zodiacEl.innerText}\n${planetaryEl.innerText}\n${insightsEl.innerText}\n${nextBirthdayEl.innerText}`; navigator.clipboard.writeText(textToCopy); alert("Copied! 📋"); });

// ------------------- DARK / LIGHT MODE -------------------
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark-mode');
if(themeBtn){ themeBtn.addEventListener('click',()=>{ document.body.classList.toggle('dark-mode'); const isDark=document.body.classList.contains('dark-mode'); localStorage.setItem('theme',isDark?'dark':'light'); }); }