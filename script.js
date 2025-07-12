document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  function isCompleted(courseId) {
    const course = document.querySelector(`.course[data-id="${courseId}"]`);
    return course && course.classList.contains("completed");
  }

  function checkPrereqs(course) {
    const prereqRaw = course.getAttribute("data-prereq");
    if (!prereqRaw) return true;

    const prereqs = prereqRaw.split(",").map(p => p.trim());
    return prereqs.every(id => isCompleted(id));
  }

  function updateLocks() {
    const allCourses = document.querySelectorAll(".course");

    allCourses.forEach(course => {
      const prerequisites = course.dataset.prereq;

      if (prerequisites) {
        const allMet = checkPrereqs(course);

        if (allMet) {
          course.classList.remove("locked");
        } else {
          course.classList.add("locked");
          course.classList.remove("completed");
        }
      }
    });
  }

  function onCourseClick(e) {
    const course = e.target;
    if (course.classList.contains("locked")) return;

    // Toggle completado
    if (course.classList.contains("completed")) {
      course.classList.remove("completed");
    } else {
      course.classList.add("completed");
    }

    // Actualizar bloqueos en cascada
    updateLocks();
  }

  courses.forEach(course => {
    course.addEventListener("click", onCourseClick);
  });

  updateLocks(); // al inicio
});
