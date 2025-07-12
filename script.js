document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");
  const creditDisplay = document.getElementById("creditos-acumulados");

  function getTotalCredits() {
    let total = 0;
    document.querySelectorAll(".course.completed").forEach(course => {
      const credits = parseInt(course.getAttribute("data-credits")) || 0;
      total += credits;
    });
    return total;
  }

  function updateCreditsDisplay(total) {
    if (creditDisplay) {
      creditDisplay.textContent = `Créditos acumulados: ${total}`;
    }
  }

  function updateUnlocking() {
    const totalCredits = getTotalCredits();
    updateCreditsDisplay(totalCredits);

    courses.forEach(course => {
      const isCompleted = course.classList.contains("completed");
      const prereqRaw = course.getAttribute("data-prereq");
      const reqCredits = parseInt(course.getAttribute("data-req-credits")) || 0;

      let prereqsMet = true;

      if (prereqRaw) {
        const prereqs = prereqRaw.split(",").map(p => p.trim());
        prereqsMet = prereqs.every(id => {
          const prereq = document.querySelector(`.course[data-id="${id}"]`);
          return prereq && prereq.classList.contains("completed");
        });
      }

      const creditMet = totalCredits >= reqCredits;

      // ✅ CORREGIDO: No volver a bloquear un curso que ya está completado
      if (!isCompleted) {
        if (prereqsMet && creditMet) {
          course.classList.remove("locked");
        } else {
          course.classList.add("locked");
        }
      }

      // Si ya no cumple, desmarcar el curso
      if (( !prereqsMet || !creditMet ) && isCompleted) {
        course.classList.remove("completed");
      }
    });
  }

  // ✅ Permitir quitar "completed" aunque esté "locked"
  courses.forEach(course => {
    course.addEventListener("click", () => {
      if (course.classList.contains("locked") && !course.classList.contains("completed")) return;
      course.classList.toggle("completed");
      updateUnlocking();
    });
  });

  // Al iniciar
  updateUnlocking();
});
