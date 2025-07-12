// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  courses.forEach(course => {
    course.addEventListener("click", () => {
      // Si el curso está bloqueado, no hace nada
      if (course.classList.contains("locked")) return;

      // Si ya está completado, tampoco hace nada
      if (course.classList.contains("completed")) return;

      // Marcar como completado
      course.classList.add("completed");

      // Buscar los cursos que dependen de este
      const courseId = course.getAttribute("data-id");

      const dependents = document.querySelectorAll(`.course[data-prereq="${courseId}"]`);
      dependents.forEach(dep => {
        // Desbloquear el curso dependiente
        dep.classList.remove("locked");
      });
    });
  });
});

