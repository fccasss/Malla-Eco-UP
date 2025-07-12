document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");
  const creditDisplay = document.getElementById("creditos-acumulados");

  function getTotalCredits() {
    let total = 0;
    document.querySelectorAll(".course.completed").forEach(course => {
      const credits = parseInt(course.getAttribute("data-credits")) || 0;
      total += credits;
    });
    return total;
  }

  function updateUnlocking() {
    const totalCredits = getTotalCredits();
    if (creditDisplay) {
      creditDisplay.textContent = `Créditos acumulados: ${totalCredits}`;
    }

    courses.forEach(course => {
      const isCompleted = course.classList.contains("completed");
      const prereqRaw = course.getAttribute("data-prereq");
      const reqCredits = parseInt(course.getAttribute("data-req-credits")) || 0;

      let prereqsMet = true;

      if (prereqRaw) {
        const prereqs = prereqRaw.split(",").map(p => p.trim());
        prereqsMet = prereqs.every(id => {
          const prereq = document.querySelector(`.course[data-id="${id}"]`);
          return prereq && prereq.classList.contains("completed");
        });
      }

      const creditMet = totalCredits >= reqCredits;

      if (prereqsMet && creditMet && !isCompleted) {
        course.classList.remove("locked");
      } else if (!prereqsMet || !creditMet) {
        course.classList.add("locked");
        if (!isCompleted) course.classList.remove("completed");
      }
    });
  }

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      course.classList.toggle("completed");
      updateUnlocking();
    });
  });

  // Al cargar
  updateUnlocking();
});
