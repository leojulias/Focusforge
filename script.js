// Robust habit tracker script with defensive checks and reliable click behavior

// Get elements (we'll guard against missing elements)
let habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const totalHabits = document.getElementById("totalHabits");
const completedHabits = document.getElementById("completedHabits");
let suggestedHabitsContainer = document.getElementById("suggestedHabits");
let celebration = document.getElementById("celebration");

// If suggested or celebration containers are missing, create them so script won't crash
if (!suggestedHabitsContainer) {
  const suggestedSection = document.createElement("section");
  suggestedSection.className = "suggested-section";
  suggestedSection.innerHTML = "<h3>Suggested Habits</h3>";
  suggestedHabitsContainer = document.createElement("div");
  suggestedHabitsContainer.id = "suggestedHabits";
  suggestedHabitsContainer.className = "suggested-habits";
  suggestedSection.appendChild(suggestedHabitsContainer);
  const app = document.querySelector(".app") || document.body;
  const reference = document.getElementById("habitList");
  if (reference) app.insertBefore(suggestedSection, reference);
  else app.appendChild(suggestedSection);
  console.warn("suggestedHabits container was missing — created automatically.");
}

if (!celebration) {
  celebration = document.createElement("div");
  celebration.id = "celebration";
  celebration.setAttribute("aria-hidden", "true");
  document.body.appendChild(celebration);
  console.warn("celebration container was missing — created automatically.");
}

if (!habitInput) {
  // try once more, else warn (index.html should contain the input)
  habitInput = document.getElementById("habitInput");
  if (!habitInput) {
    console.error("habitInput not found. Add an input with id='habitInput' in your HTML.");
  }
}

let habits = JSON.parse(localStorage.getItem("habits")) || [];

const suggestedHabits = [
  "💧 Drink 8 glasses of water",
  "🏃 Exercise for 30 minutes",
  "📖 Read for 20 minutes",
  "🧘 Meditate for 10 minutes",
  "🌅 Wake up at 6 AM",
  "💤 Sleep 8 hours",
  "🥗 Eat healthy meals",
  "📝 Journal daily thoughts"
];

function createCelebration() {
  if (!celebration) return;
  celebration.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 0.3 + "s";
    confetti.style.backgroundColor = ["#00ffcc","#ff4757","#ffd93d","#6c5ce7","#fd79a8"][Math.floor(Math.random()*5)];
    celebration.appendChild(confetti);
  }
  celebration.classList.add("active");
  setTimeout(() => celebration.classList.remove("active"), 1000);
}

function renderSuggestedHabits() {
  if (!suggestedHabitsContainer) return;
  suggestedHabitsContainer.innerHTML = "";
  suggestedHabits.forEach((habit) => {
    const chip = document.createElement("div");
    chip.className = "suggested-chip";
    chip.textContent = habit;
    chip.addEventListener("click", () => {
      if (!habitInput) return;
      habitInput.value = habit;
      addHabit();
    });
    suggestedHabitsContainer.appendChild(chip);
  });
}

function renderHabits(animateLastItem = false) {
  if (!habitList) {
    console.error("habitList element not found.");
    return;
  }
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit-item show";
    li.setAttribute("role", "button");
    li.tabIndex = 0;

    if (animateLastItem && index === habits.length - 1) {
      li.classList.remove("show");
      setTimeout(() => li.classList.add("show"), 50);
    }

    const habitText = document.createElement("span");
    habitText.className = "habit-text";
    habitText.textContent = habit.text;
    if (habit.completed) habitText.classList.add("completed");

    // Use click (widely compatible across browsers and touch devices)
    li.addEventListener("click", (e) => {
      // click on delete button will stopPropagation; safe to toggle here
      toggleHabit(index);
    });

    // Keyboard accessibility
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleHabit(index);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×";
    deleteBtn.setAttribute("aria-label", `Delete habit: ${habit.text}`);
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHabit(index);
    });

    li.appendChild(habitText);
    li.appendChild(deleteBtn);
    habitList.appendChild(li);
  });

  if (totalHabits) totalHabits.textContent = habits.length;
  if (completedHabits) completedHabits.textContent = habits.filter(h => h.completed).length;
  localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
  if (!habitInput) return;
  const text = habitInput.value.trim();
  if (text === "") return;
  habits.push({ text, completed: false });
  habitInput.value = "";
  renderHabits(true);
}

function toggleHabit(index) {
  if (index < 0 || index >= habits.length) {
    console.warn("toggleHabit: index out of range", index);
    return;
  }
  console.log("toggleHabit called", index, habits[index]);
  const wasCompleted = habits[index].completed;
  habits[index].completed = !habits[index].completed;
  if (!wasCompleted && habits[index].completed) createCelebration();
  renderHabits();
}

function deleteHabit(index) {
  const li = habitList && habitList.children[index];
  if (li) li.classList.add("removing");
  setTimeout(() => {
    habits.splice(index, 1);
    renderHabits();
  }, 300);
}

// Wire up controls
if (addHabitBtn) addHabitBtn.addEventListener("click", addHabit);
if (habitInput) {
  habitInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addHabit();
  });
}

// initial render
renderSuggestedHabits();
renderHabits();
