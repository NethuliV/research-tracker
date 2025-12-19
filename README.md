# Research Project Tracker

🔬 Research Project Tracker is a small full-stack application for managing research projects, milestones, documents and users. It uses a Spring Boot backend and a React + TypeScript frontend.

---

## Stack
- Backend: Java + Spring Boot (Spring Security, Spring Data JPA)
- Database: MySQL
- Frontend: React (TypeScript) + Bootstrap
- Build tools: Maven (backend), npm / create-react-app (frontend)

---

## Quick start

### Prerequisites
- JDK 17+ (JDK 21 tested)
- Maven (or use the provided `mvnw` wrapper)
- Node.js + npm
- MySQL running locally (or a MySQL server you can reach)

### Setup database
1. Create a MySQL database or allow the app to create it. The default JDBC URL in `backend/researchtracker/src/main/resources/application.properties` is:

   ```text
   jdbc:mysql://localhost:3306/research_tracker_db?createDatabaseIfNotExist=true
   ```

2. Set DB credentials if you don't use the defaults (`root` / `123789`) by editing `application.properties`.

### Backend (Spring Boot)
1. Open a terminal and go to `backend/researchtracker`.
2. Run the app using the wrapper:
   - Windows: `./mvnw.cmd spring-boot:run`
   - macOS / Linux: `./mvnw spring-boot:run`

By default the backend runs on port `8080`.

> Important: JWT configuration is in `application.properties` (property `jwt.secret`). The app uses HS512 and requires a sufficiently long secret. The repo contains a long secret by default; for production replace it with a secure secret management mechanism.

### Frontend (React)
1. Open a terminal and go to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm start
   ```

By default the frontend runs on `http://localhost:3000` and expects the backend at `http://localhost:8080`.

---

## Key features
- User authentication (JWT)
- Role-based access (PI, ADMIN, MEMBER)
- Project CRUD
- Project details and inline editing
- Milestones & documents (per project)

---

## API highlights
Backend endpoints are under `/api/*` (in `backend/researchtracker/src/main/java/lk/ijse/cmjd/researchtracker`):
- `POST /api/auth/signup` — sign up (returns token and role)
- `POST /api/auth/login` — login (returns token and role)
- `GET /api/projects` — list projects
- `POST /api/projects` — create project (PI, ADMIN)
- `PUT /api/projects/{id}` — update project (PI, ADMIN)
- `PATCH /api/projects/{id}/status` — update status (PI, ADMIN)
- `GET /api/projects/{id}` — project details

---

## Tests
- Backend unit tests: run `./mvnw test` from `backend/researchtracker`.
- Frontend tests: `npm test` in `frontend/`.

---

## Development notes & troubleshooting
- If the backend fails to start due to port conflicts, change server port with `--server.port` or free port `8080`.
- If JWT throws a weak key exception in tests, ensure `jwt.secret` in `application.properties` is a long secret (HS512 requires >= 64 bytes). The app includes logic to fall back to a generated secure key if the provided secret is too short.
- CORS: backend allows `http://localhost:3000` in `SecurityConfig`.
- If the frontend shows the Projects page as the root, the default behavior is to show login first; start at `/` to see the Login page.

---

## Contributing
- Fork, create a branch, make changes, add tests and open a PR.
- Keep changes scoped, add unit tests for backend logic and components for frontend UI changes.

---

If you'd like, I can add a quick `docker-compose` config to run MySQL + backend together and update README run scripts. ✅
