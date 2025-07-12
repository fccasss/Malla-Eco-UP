document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  // Manejo de clic en cursos
  courses.forEach(course => {
    course.addEventListener("click", () => {
      // Si está bloqueado, no hacer nada
      if (course.classList.contains("locked")) return;

      // Alternar el estado "completed"
      course.classList.toggle("completed");

      // Recalcular el estado de todos los cursos
      updateCourseStates();
    });
  });

  function updateCourseStates() {
    // Primero, bloquear todos los cursos que tengan prerequisitos
    document.querySelectorAll(".course[data-prereq]").forEach(course => {
      course.classList.add("locked");
    });

    let changed;
    do {
      changed = false;

      document.querySelectorAll(".course.locked").forEach(course => {
        const prereqAttr = course.getAttribute("data-prereq");
        if (!prereqAttr) return;

        const prereqs = prereqAttr.split(",").map(p => p.trim());

        const allMet = prereqs.every(prereqId => {
          const prereqCourse = document.querySelector(`.course[data-id="${prereqId}"]`);
          return prereqCourse && prereqCourse.classList.contains("completed");
        });

        if (allMet) {
          course.classList.remove("locked");
          changed = true; // Hubo un cambio, se seguirá iterando
        }
      });
    } while (changed);
  }
});
