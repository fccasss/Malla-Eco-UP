document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  function updateUnlocks() {
    // Recalcula créditos
    let totalCredits = 0;
    document.querySelectorAll(".course.completed").forEach(c => {
      const credits = parseInt(c.getAttribute("data-credits")) || 0;
      totalCredits += credits;
    });

    // Desbloqueo por prerrequisitos
    document.querySelectorAll(".course.locked").forEach(course => {
      const prereqRaw = course.getAttribute("data-prereq");
      let prerequisitesMet = true;

      if (prereqRaw) {
        const prereqs = prereqRaw.split(",").map(p => p.trim());
        prerequisitesMet = prereqs.every(prereqId => {
          const prereqElement = document.querySelector(`.course[data-id="${prereqId}"]`);
          return prereqElement && prereqElement.classList.contains("completed");
        });
      }

      const minCredits = parseInt(course.getAttribute("data-mincredits"));
      const creditsMet = isNaN(minCredits) || totalCredits >= minCredits;

      if (prerequisitesMet && creditsMet) {
        course.classList.remove("locked");
      } else {
        course.classList.add("locked");
      }
    });
  }

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      course.classList.toggle("completed");

      updateUnlocks();
    });
  });

  updateUnlocks(); // inicializa
});
