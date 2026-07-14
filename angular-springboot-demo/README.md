# Task Manager — Angular + Spring Boot End-to-End Sample

A minimal full-stack CRUD app demonstrating an Angular frontend talking to a
Spring Boot REST API backed by an in-memory H2 database.

## Project structure

```
angular-springboot-demo/
├── backend/     Spring Boot REST API (Java 17, Maven)
└── frontend/    Angular 17 SPA
```

## Features

- List, create, edit, delete, and toggle-complete tasks
- REST API: `GET/POST /api/tasks`, `GET/PUT/DELETE /api/tasks/{id}`
- H2 in-memory database (no install required) with a web console
- CORS configured so the Angular dev server (port 4200) can call the API (port 8080)
- Simple Angular routing between a list view and a create/edit form

## Prerequisites

- Java 17+ and Maven (or use the Maven wrapper if you generate one via `mvn -N wrapper:wrapper`)
- Node.js 18+ and npm
- Angular CLI: `npm install -g @angular/cli`

## Running the backend

```bash
cd backend
mvn spring-boot:run
```

- API available at `http://localhost:8080/api/tasks`
- H2 console at `http://localhost:8080/h2-console`
  (JDBC URL: `jdbc:h2:mem:taskdb`, user: `sa`, no password)

## Running the frontend

```bash
cd frontend
npm install
ng serve
```

- App available at `http://localhost:4200`

Make sure the backend is running first, since the Angular app calls
`http://localhost:8080/api/tasks` directly (see `src/app/services/task.service.ts`).

## How the pieces fit together

1. **Task.java** — JPA entity mapped to the `tasks` table.
2. **TaskRepository.java** — Spring Data JPA repository, gives CRUD methods for free.
3. **TaskController.java** — REST controller exposing `/api/tasks` endpoints, with
   `@CrossOrigin` allowing calls from the Angular dev server.
4. **task.service.ts** — Angular service wrapping `HttpClient` calls to the API.
5. **task-list.component.ts/html** — Displays tasks, lets you toggle/delete/edit.
6. **task-form.component.ts/html** — Shared component for creating and editing
   a task, based on whether a route param `id` is present.
7. **app-routing.module.ts** — Wires up `/`, `/new`, and `/edit/:id` routes.

## Extending this sample

Ideas if you want to build on it:
- Swap H2 for MySQL/PostgreSQL (update `application.properties` and add the JDBC driver dependency)
- Add pagination/sorting to `GET /api/tasks`
- Add authentication (Spring Security + JWT) and an Angular auth guard
- Move to standalone Angular components / signals if you're on Angular 17+ and want the newer style
- Containerize with Docker Compose (one service for backend, one for frontend, one for the DB)

## Notes

This is a teaching/reference sample, not production-hardened: there's no
authentication, and error handling is intentionally minimal so the core
Angular ↔ Spring Boot data flow stays easy to follow.
