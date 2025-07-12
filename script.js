document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  // Manejo de clic
  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      course.classList.toggle("completed");

      updateCourseStates();
    });
  });

  function updateCourseStates() {
    // Reiniciar: bloquear todos con prerequisitos
    document.querySelectorAll(".course[data-prereq]").forEach(course => {
      course.classList.add("locked");
    });

    // Repetir desbloqueo mientras haya cambios
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
          changed = true;
        }
      });
    } while (changed);
  }
});
