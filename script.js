body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.app {
  background: #141414;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(255,255,255,0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: #00ffcc;
  margin-bottom: 10px;
}

.tagline {
  color: #aaa;
  font-size: 14px;
  margin-bottom: 20px;
}

.habit-input {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
}

button {
  padding: 10px 15px;
  background: #00ffcc;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #000;
}

ul {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

li {
  background: #222;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.stats {
  margin-top: 20px;
  color: #ccc;
}

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