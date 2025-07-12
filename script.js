document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  function updateLockStates() {
    document.querySelectorAll(".course").forEach(course => {
      const prereqRaw = course.getAttribute("data-prereq");
      if (!prereqRaw) return;

      const prereqs = prereqRaw.split(",").map(p => p.trim());

      const allMet = prereqs.every(prereqId => {
        const prereqElement = document.querySelector(`.course[data-id="${prereqId}"]`);
        return prereqElement && prereqElement.classList.contains("completed");
      });

      if (allMet) {
        course.classList.remove("locked");
      } else {
        course.classList.add("locked");
        course.classList.remove("completed"); // si ya no cumple, se bloquea y desmarca
      }
    });
  }

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      // Alternar estado completado
      course.classList.toggle("completed");

      // Revisar bloqueo/desbloqueo de cursos dependientes
      updateLockStates();
    });
  });
});
