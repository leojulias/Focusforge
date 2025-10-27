const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const totalHabits = document.getElementById("totalHabits");
const completedHabits = document.getElementById("completedHabits");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.text;
    if (habit.completed) li.classList.add("completed");

    li.addEventListener("click", () => toggleHabit(index));

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
  renderHabits();
}

function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;
  renderHabits();
}

addHabitBtn.addEventListener("click", addHabit);
renderHabits();
