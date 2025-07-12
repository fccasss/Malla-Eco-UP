document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;
      if (course.classList.contains("completed")) return;

      // Marcar como completado visualmente
      course.classList.add("completed");

      // Obtener ID del curso completado
      const courseId = course.dataset.id;

      // Buscar cursos dependientes
      document.querySelectorAll(".course.locked").forEach(dep => {
        const prereqRaw = dep.getAttribute("data-prereq");
        if (!prereqRaw) return;

        const prereqs = prereqRaw.split(",").map(p => p.trim());

        const allMet = prereqs.every(prereqId => {
          const prereqElement = document.querySelector(`.course[data-id="${prereqId}"]`);
          return prereqElement && prereqElement.classList.contains("completed");
        });

        if (allMet) {
          dep.classList.remove("locked");
        }
      });
    });
  });
});
