# Programacion-web-2-2025
Segundo proyecto de la materia de programación web

## Estructura del Proyecto

```text
├── backend/                  # Servidor Node.js
│   ├── scripts/              # Scripts de utilidad (ej. carga de datos)
│   ├── src/
│   │   ├── certs/            # Certificados SSL (Generados automáticamente)
│   │   ├── config/           # Configuración de BD y JWT
│   │   ├── controllers/      # Lógica de negocio (Usuarios, Cuestionarios, etc.)
│   │   ├── middlewares/      # Seguridad y validación (Auth, Roles, ErrorHandler)
│   │   ├── models/           # Esquemas de datos MongoDB (Mongoose)
│   │   ├── routes/           # Rutas de la API
│   │   ├── app.js            # Configuración de Express (Middlewares, CORS, Helmet)
│   │   └── server.js         # Punto de entrada y servidor HTTP/2
│   └── package.json          # Dependencias del Backend
│
├── frontend/                 # Cliente Web
│   ├── css/                  # Estilos
│   ├── js/                   # Lógica del cliente (Fetch API)
│   └── *.html                # Vistas (Login, Perfil, Paneles)
│
├── generar-cert.js           # Script raíz para generar certificados SSL
├── package.json              # Dependencias raíz (para generar certificados)
└── README.md                 # Documentación del proyecto