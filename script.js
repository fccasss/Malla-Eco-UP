body {
  font-family: 'Segoe UI', sans-serif;
  background: #ffffff;
  margin: 0;
  padding: 20px;
  text-align: center;
  color: #002f6c;
}

h1 {
  color: #002f6c;
  margin-bottom: 40px;
}

#creditos-acumulados {
  margin-bottom: 20px;
  font-weight: bold;
}

.container {
  display: flex;
  flex-wrap: nowrap;
  gap: 40px;
  overflow-x: auto;
  padding-bottom: 20px;
  max-width: 100vw;
}

.semester {
  background: #e6e9ed;
  padding: 20px;
  border-radius: 15px;
  width: 240px;
  box-shadow: 0 4px 10px rgba(0, 47, 108, 0.05);
  flex-shrink: 0;
}

.semester h2 {
  color: #002f6c;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccd6e0;
  padding-bottom: 6px;
}

/* 🔓 Cursos desbloqueados */
.course {
  background: #002f6c; /* azul UP */
  color: white;
  margin: 10px 0;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.course:hover {
  transform: scale(1.02);
}

/* ✅ Cursos completados */
.course.completed {
  background: #00a6d6 !important; /* celeste UP */
  color: white !important;
  text-decoration: line-through;
  cursor: default;
  box-shadow: none;
}

/* 🔒 Cursos bloqueados */
.course.locked {
  background: #dbe2ea !important; /* gris claro */
  color: #888 !important;
  cursor: not-allowed;
  border: 1px dashed #a3b3c3;
  box-shadow: none;
}

.course.locked:hover {
  transform: none;
}

/* 🔒✅ Si curso está marcado pero se volvió a bloquear */
.course.locked.completed {
  background: #00a6d6 !important;
  color: white !important;
  text-decoration: line-through;
}

/* Scroll horizontal si hay muchos semestres */
.scroll-wrapper {
  overflow-x: auto;
  width: 100vw;
}
