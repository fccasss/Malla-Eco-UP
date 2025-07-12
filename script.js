document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  function updateLocks() {
    let changed = true;
    while (changed) {
      changed = false;

      courses.forEach(course => {
        const prereqRaw = course.getAttribute("data-prereq");
        if (!prereqRaw) return;

        const prereqs = prereqRaw.split(",").map(p => p.trim());
        const allMet = prereqs.every(id => {
          const el = document.querySelector(`.course[data-id="${id}"]`);
          return el && el.classList.contains("completed");
        });

        if (allMet) {
          if (course.classList.contains("locked")) {
            course.classList.remove("locked");
            changed = true;
          }
        } else {
          if (!course.classList.contains("locked")) {
            course.classList.add("locked");
            course.classList.remove("completed");
            changed = true;
          }
        }
      });
    }
  }

  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;
      course.classList.toggle("completed");
      updateLocks();
    });
  });

  updateLocks(); // aplicar estado inicial
});
