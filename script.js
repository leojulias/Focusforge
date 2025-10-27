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
    
    const habitText = document.createElement("span");
    habitText.className = "habit-text";
    habitText.textContent = habit.text;
    if (habit.completed) habitText.classList.add("completed");
    
    habitText.addEventListener("click", () => toggleHabit(index));
    
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

function deleteHabit(index) {
  habits.splice(index, 1);
  renderHabits();
}

addHabitBtn.addEventListener("click", addHabit);

habitInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addHabit();
  }
});

renderHabits();
