document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      // Alternar estado de completado
      course.classList.toggle("completed");

      // Reevaluar todos los cursos bloqueados
      document.querySelectorAll(".course").forEach(dep => {
        const prereqRaw = dep.getAttribute("data-prereq");
        if (!prereqRaw) return;

        const prereqs = prereqRaw.split(",").map(p => p.trim());

        const allMet = prereqs.every(prereqId => {
          const prereqElement = document.querySelector(`.course[data-id="${prereqId}"]`);
          return prereqElement && prereqElement.classList.contains("completed");
        });

        if (allMet) {
          dep.classList.remove("locked");
        } else {
          dep.classList.add("locked");
        }
      });
    });
  });
});
