# F1 Predictor

A web application where players predict the podium of each Formula 1 Grand Prix and the World Champions, and compete in race and season rankings. It is a portfolio project for a QA / test-engineer career change, so quality and testability matter more than speed.

Source of truth: `docs/spec.md`, the Issues in GitHub (acceptance criteria), and `docs/test-strategy.md`.

## Stack

- Frontend: React + Vite, TypeScript
- Backend: Node + Express, TypeScript
- Database: SQLite
- Tests: Vitest (unit), Playwright (API and E2E with Page Object Model)
- CI: GitHub Actions
- Data: Jolpica F1 API (Ergast successor)

## Who does what

Claude:
- writes the application code (frontend, backend, types), one file at a time, and explains each file before moving on;
- critiques the user's spec, Issues, acceptance criteria and test documents (one question at a time) and does not write them for the user.

The user writes:
- all tests (unit, API, E2E) and Page Objects,
- the ranking SQL query,
- the CI configuration,
- Issues, PR descriptions and test documents.

## Working rules

- Language: chat in Polish; everything in the repository (code, comments, docs, commit messages, Issues, PRs) in English.
- Step size: one file at a time. Explain the file, then wait for the user to say "continue".
- Every change goes through a branch and a pull request; `main` is protected.
- Commit messages: English, imperative, one line (e.g. `Add scoring function`).
- Messages shown to players must match the text in the Issue acceptance criteria exactly.
- Work follows milestones M1–M5. Ideas outside the scope get the label `later`.
- Do not write tests for the user; point out missing cases instead.

## Technical rules

- The server decides all deadlines using its own clock (UTC). Time comes from an injectable `clock.now()`; `POST /test/clock` exists only when `NODE_ENV=test` and returns 404 otherwise.
- Jolpica is isolated behind one module with an interface and two implementations (real and fixtures, selected by `F1_DATA=fixtures`). Validate the structure of every response; never overwrite correct data with bad data.
- Nickname: unique on the normalised form (case-insensitive, including Polish letters; SQLite `NOCASE` is ASCII-only), enforced by a unique index.
- PIN: hashed, never returned in any response.
- Status codes: 400 invalid input, 401 guest, 403 forbidden or closed, 404 not found.
- Tests use a separate SQLite database, cleaned before each test.
