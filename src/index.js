import "./style.css";

const nav = document.querySelector("nav ul");
const main = document.querySelector("main");
const header = main.querySelector("h2");
const output = main.querySelector("pre");
const runBtn = document.querySelector("#runBtn");
const runSampleBtn = document.querySelector("#runSampleBtn");
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

async function run(inputDir) {
  const dayStr = String(currentDay).padStart(2, "0");

  let input = inputArea.value.trim();
  if (!input) {
    try {
      input = (await import(`${inputDir}/day${dayStr}.txt`)).default;
    } catch {
      input = "";
    }
  }

  try {
    const mod = await import(`./solutions/day${dayStr}.js`);

    const t0 = performance.now();

    let p1, p1time;
    if (mod.part1) {
      const t1 = performance.now();
      p1 = mod.part1(input);
      p1time = performance.now() - t1;
    }

    let p2, p2time;
    if (mod.part2) {
      const t2 = performance.now();
      p2 = mod.part2(input);
      p2time = performance.now() - t2;
    }

    const totalTime = performance.now() - t0;

    output.textContent =
      `Part 1: ${p1} (${p1time?.toFixed(2)} ms)\n` +
      `Part 2: ${p2} (${p2time?.toFixed(2)} ms)\n\n` +
      `Total: ${totalTime.toFixed(2)} ms`;
  } catch (err) {
    output.textContent = `Error loading solution for day ${currentDay}:\n${err}`;
  }
}

runBtn.addEventListener("click", async () => {
  output.textContent = "Running...";
  await run("./inputs");
});

runSampleBtn.addEventListener("click", async () => {
  output.textContent = "Running...";
  await run("./inputs/sample");
});
