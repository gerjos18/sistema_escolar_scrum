
// Datos de ejemplo para el proyecto "Sistema Escolar"
// Nota: puedes editar estos datos o cargarlos desde un JSON real.
window.appData = {
  productBacklog: [
    {
      id: "US-01",
      title: "Como administrador, quiero crear usuarios con roles (admin, docente, secretaria) para controlar accesos",
      priority: "Alta",
      points: 8,
      status: "Todo",
      acceptance: [
        "Puedo crear, editar y desactivar usuarios",
        "Cada usuario tiene un rol asignado",
        "Las rutas quedan protegidas por rol"
      ],
      notes: "Base de seguridad del sistema"
    },
    {
      id: "US-02",
      title: "Como usuario, quiero iniciar sesión con contraseña encriptada para seguridad",
      priority: "Alta",
      points: 5,
      status: "En progreso",
      acceptance: [
        "Passwords con hash (werkzeug/BCrypt)",
        "Sesión persistente hasta logout",
        "Mensajes de error claros"
      ],
      notes: "Integración con backend existente o mock"
    },
    {
      id: "US-03",
      title: "Como secretaria, quiero registrar alumnos desde un formulario para mantener el padrón actualizado",
      priority: "Alta",
      points: 8,
      status: "Todo",
      acceptance: [
        "Campos: id_alumno, nombre, apellidos, grado, grupo, número_tutor",
        "Validación de datos y feedback",
        "Listado y búsqueda básica"
      ],
      notes: "Conexión futura a MySQL"
    },
    {
      id: "US-04",
      title: "Como secretaria, quiero importar alumnos desde CSV para agilizar la carga masiva",
      priority: "Media",
      points: 5,
      status: "Todo",
      acceptance: [
        "Plantilla CSV con encabezados",
        "Vista previa y validaciones",
        "Reporte de filas importadas/erróneas"
      ],
      notes: "Depende de US-03"
    },
    {
      id: "US-05",
      title: "Como docente, quiero registrar asistencias (incl. QR) para automatizar el control",
      priority: "Alta",
      points: 13,
      status: "Todo",
      acceptance: [
        "Marcar presente/ausente/tarde",
        "Escaneo QR (fase posterior)",
        "Exportar a CSV"
      ],
      notes: "Epic: Asistencias; depende de alumnos"
    },
    {
      id: "US-06",
      title: "Como administrador, quiero dashboards por rol para ver KPIs clave",
      priority: "Media",
      points: 8,
      status: "Todo",
      acceptance: [
        "Métricas básicas por rol",
        "Gráficas simples",
        "Accesos rápidos a módulos"
      ],
      notes: "UI/UX"
    }
  ],

  sprints: [
    {
      id: "Sprint 1",
      goal: "Autenticación, roles y registro/listado de alumnos (MVP)",
      start: "2025-09-04",
      end: "2025-09-17",
      capacity: 20,
      definitionOfDone: [
        "Criterios de aceptación cumplidos",
        "Pruebas básicas pasadas",
        "Código en GitHub con README",
        "Demo navegable"
      ],
      items: ["US-01", "US-02", "US-03"]
    },
    {
      id: "Sprint 2",
      goal: "Importación CSV y base de asistencias (sin QR)",
      start: "2025-09-18",
      end: "2025-10-01",
      capacity: 18,
      definitionOfDone: [
        "CSV validado y cargado",
        "Registro de asistencias manual",
        "Exportaciones básicas",
        "Documentación actualizada"
      ],
      items: ["US-04", "US-05"]
    }
  ],

  ceremonies: [
    { type: "Planning", date: "2025-09-04", time: "09:00", sprint: "Sprint 1" },
    { type: "Daily Scrum", date: "2025-09-05", time: "09:00", sprint: "Sprint 1", repeat: "Cada día hábil del sprint" },
    { type: "Review", date: "2025-09-17", time: "16:00", sprint: "Sprint 1" },
    { type: "Retrospective", date: "2025-09-17", time: "17:00", sprint: "Sprint 1" },

    { type: "Planning", date: "2025-09-18", time: "09:00", sprint: "Sprint 2" },
    { type: "Daily Scrum", date: "2025-09-19", time: "09:00", sprint: "Sprint 2", repeat: "Cada día hábil del sprint" },
    { type: "Review", date: "2025-10-01", time: "16:00", sprint: "Sprint 2" },
    { type: "Retrospective", date: "2025-10-01", time: "17:00", sprint: "Sprint 2" }
  ]
};
