document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      course.classList.toggle("completed");

      updateStates();
    });
  });

  function updateStates() {
    const allCourses = Array.from(document.querySelectorAll(".course"));

    // 1. Bloquear todos los que tienen prereq
    allCourses.forEach(course => {
      if (course.dataset.prereq) {
        course.classList.add("locked");
      }
    });

    // 2. Desbloquear si cumplen sus prerequisitos
    let changed;
    do {
      changed = false;

      allCourses.forEach(course => {
        if (course.dataset.prereq && course.classList.contains("locked")) {
          const prereqs = course.dataset.prereq.split(',').map(p => p.trim());
          const fulfilled = prereqs.every(id => {
            const c = document.querySelector(`.course[data-id="${id}"]`);
            return c && c.classList.contains("completed");
          });

          if (fulfilled) {
            course.classList.remove("locked");
            changed = true;
          }
        }
      });
    } while (changed);

    // 3. Eliminar .completed de cursos que ya NO cumplen
    allCourses.forEach(course => {
      if (course.dataset.prereq && course.classList.contains("completed")) {
        const prereqs = course.dataset.prereq.split(',').map(p => p.trim());
        const stillValid = prereqs.every(id => {
          const c = document.querySelector(`.course[data-id="${id}"]`);
          return c && c.classList.contains("completed");
        });

        if (!stillValid) {
          course.classList.remove("completed");
        }
      }
    });

    // 4. Volver a bloquear los que ya no cumplen luego de quitar .completed
    allCourses.forEach(course => {
      if (course.dataset.prereq) {
        const prereqs = course.dataset.prereq.split(',').map(p => p.trim());
        const fulfilled = prereqs.every(id => {
          const c = document.querySelector(`.course[data-id="${id}"]`);
          return c && c.classList.contains("completed");
        });

        if (!fulfilled) {
          course.classList.add("locked");
        }
      }
    });
  }
});
