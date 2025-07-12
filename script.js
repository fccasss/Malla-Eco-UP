document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      // Alternar clase 'completed'
      course.classList.toggle("completed");

      // Obtener todos los cursos completados
      const completedIds = Array.from(document.querySelectorAll(".course.completed"))
                                .map(c => c.dataset.id);

      // Revisar todos los cursos bloqueados
      document.querySelectorAll(".course.locked").forEach(dep => {
        const prereqRaw = dep.getAttribute("data-prereq");
        if (!prereqRaw) return;

        const prereqs = prereqRaw.split(",").map(p => p.trim());
        const allMet = prereqs.every(id => completedIds.includes(id));

        if (allMet) {
          dep.classList.remove("locked");
        }
      });
    });
  });
});
