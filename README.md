# Dashboard de Usuarios (Frontend)

Este proyecto es un dashboard de usuarios desarrollado en Next.js, TypeScript y SCSS Modules. Permite listar, crear, editar, filtrar y borrar usuarios, así como visualizar estadísticas básicas. Este proyecto es parte de una prueba técnica.

## Requisitos

- Node.js 22
- npm
- Descargar y correr backend: https://github.com/fertarvega/backend-test

## Instalación

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPO>
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Backend

Este frontend está pensado para funcionar con un backend RESTful. Puedes usar el backend de ejemplo en el siguiente enlace:

➡️ [https://github.com/fertarvega/backend-test]

> **Nota:** En este proyecto utilicé el backend de Next.js (API routes) para demostrar habilidades del framework. Sin embargo, se puede modificar fácilmente el frontend para hacer las peticiones directamente al backend externo, eliminando la capa intermedia de Next.js si fuera necesario o más optimo.

## Características

- Listado de usuarios con paginación y filtros (nombre, email, empresa)
- Creación, edición y borrado de usuarios
- Modal para formularios
- Validación en frontend
- Mensajes de éxito/error
- SCSS Modules y variables para estilos consistentes
- Código claro, mantenible y fácil de adaptar

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo

---

Quedo atento a cualquier duda o comentario.
