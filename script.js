document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  function updateUnlocking() {
    courses.forEach(course => {
      if (!course.classList.contains("locked")) return;
      const prereqRaw = course.getAttribute("data-prereq");
      if (!prereqRaw) return;

      const prereqs = prereqRaw.split(",").map(p => p.trim());
      const allMet = prereqs.every(id => {
        const prereq = document.querySelector(`.course[data-id="${id}"]`);
        return prereq && prereq.classList.contains("completed");
      });

      if (allMet) {
        course.classList.remove("locked");
      }
    });

    // También bloquear si se desmarcaron prerequisitos
    courses.forEach(course => {
      const prereqRaw = course.getAttribute("data-prereq");
      if (!prereqRaw) return;

      const prereqs = prereqRaw.split(",").map(p => p.trim());
      const allMet = prereqs.every(id => {
        const prereq = document.querySelector(`.course[data-id="${id}"]`);
        return prereq && prereq.classList.contains("completed");
      });

      if (!allMet && !course.classList.contains("locked")) {
        course.classList.add("locked");
        course.classList.remove("completed");
      }
    });
  }

  function updateCredits() {
    let total = 0;
    document.querySelectorAll(".course.completed").forEach(course => {
      const credits = parseInt(course.getAttribute("data-credits")) || 0;
      total += credits;
    });
    document.getElementById("creditos-acumulados").textContent = `Créditos acumulados: ${total}`;
  }

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      course.classList.toggle("completed");
      updateUnlocking();
      updateCredits();
    });
  });

  // Iniciar estado
  updateUnlocking();
  updateCredits();
});
