const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const totalHabits = document.getElementById("totalHabits");
const completedHabits = document.getElementById("completedHabits");
const suggestedHabitsContainer = document.getElementById("suggestedHabits");
const celebration = document.getElementById("celebration");

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
  celebration.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 0.3 + "s";
    confetti.style.backgroundColor = [
      "#00ffcc",
      "#ff4757",
      "#ffd93d",
      "#6c5ce7",
      "#fd79a8"
    ][Math.floor(Math.random() * 5)];
    celebration.appendChild(confetti);
  }
  
  celebration.classList.add("active");
  setTimeout(() => {
    celebration.classList.remove("active");
  }, 1000);
}

function renderSuggestedHabits() {
  suggestedHabitsContainer.innerHTML = "";
  suggestedHabits.forEach((habit) => {
    const chip = document.createElement("div");
    chip.className = "suggested-chip";
    chip.textContent = habit;
    chip.addEventListener("click", () => {
      habitInput.value = habit;
      addHabit();
    });
    suggestedHabitsContainer.appendChild(chip);
  });
}

function renderHabits(animateLastItem = false) {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit-item show";
    li.setAttribute("role", "button");
    li.tabIndex = 0;

    if (animateLastItem && index === habits.length - 1) {
      li.classList.remove("show");
      setTimeout(() => {
        li.classList.add("show");
      }, 50);
    }
    
    const habitText = document.createElement("span");
    habitText.className = "habit-text";
    habitText.textContent = habit.text;
    if (habit.completed) habitText.classList.add("completed");

    // Make the whole li clickable/tappable for better touch support
    li.addEventListener("click", () => toggleHabit(index));

    // Keyboard accessibility: Enter or Space toggles completion
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
      e.stopPropagation(); // prevent li click from firing
      deleteHabit(index);
    });
    
    li.appendChild(habitText);
    li.appendChild(deleteBtn);
    habitList.appendChild(li);
  });

  totalHabits.textContent = habits.length;
  completedHabits.textContent = habits.filter(h => h.completed).length;
  localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
  const text = habitInput.value.trim();
  if (text === "") return;
  habits.push({ text, completed: false });
  habitInput.value = "";
  renderHabits(true);
}

function toggleHabit(index) {
  const wasCompleted = habits[index].completed;
  habits[index].completed = !habits[index].completed;
  
  if (!wasCompleted && habits[index].completed) {
    createCelebration();
  }
  
  renderHabits();
}

function deleteHabit(index) {
  const li = habitList.children[index];
  li.classList.add("removing");
  
  setTimeout(() => {
    habits.splice(index, 1);
    renderHabits();
  }, 300);
}

addHabitBtn.addEventListener("click", addHabit);

habitInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addHabit();
  }
});

renderSuggestedHabits();
renderHabits();
