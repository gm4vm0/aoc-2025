import "./style.css";

const nav = document.querySelector("nav ul");
const main = document.querySelector("main");
const header = main.querySelector("h2");
const output = main.querySelector("pre");
const runBtn = document.querySelector("#runBtn");
const inputArea = main.querySelector("textarea");

const totalDays = 12;

for (let i = 1; i <= totalDays; i++) {
  const li = document.createElement("li");
  li.textContent = `Day ${i}`;
  if (i === 1) li.classList.add("active");
  nav.appendChild(li);
}

let currentDay = 1;

const dayItems = nav.querySelectorAll("li");
dayItems.forEach((li, index) => {
  li.addEventListener("click", () => {
    dayItems.forEach((d) => d.classList.remove("active"));
    li.classList.add("active");

    currentDay = index + 1;
    header.textContent = `--- Day ${currentDay} Runner ---`;
    output.textContent = "// Output will appear here...";
  });
});

runBtn.addEventListener("click", async () => {
  output.textContent = "Running...";

  const dayStr = String(currentDay).padStart(2, "0");

  let input = inputArea.value.trim();
  if (!input) {
    try {
      input = (await import(`./inputs/day${dayStr}.txt`)).default;
    } catch {
      input = "";
    }
  }

  try {
    const mod = await import(`./solutions/day${dayStr}.js`);
    const part1 = mod.part1?.(input);
    const part2 = mod.part2?.(input);

    output.textContent = `Part 1: ${part1}\nPart 2: ${part2}`;
  } catch (err) {
    output.textContent = `Error loading solution for day ${currentDay}:\n${err}`;
  }
});
