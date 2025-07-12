document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  function updateCourseLocks() {
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
        course.classList.remove("completed"); // Se quita si ya no cumple
      }
    });
  }

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      // Alternar completado
      if (course.classList.contains("completed")) {
        course.classList.remove("completed");
      } else {
        course.classList.add("completed");
      }

      updateCourseLocks();
    });
  });

  updateCourseLocks(); // Inicializar al cargar
});
