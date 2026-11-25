# Test strategy

## 1. Purpose and scope

We test an application for predicting the results of Formula 1 races and seasons. Its purpose is to let many players predict results and to build a ranking. More details are in `spec.md` and in Issue 9 (limitations and out-of-scope ideas).

## 2. Risks

| No | Scenario | Likelihood | Impact | Priority | Detectability | Test level | Mitigation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | If Jolpica renames a field, e.g. `place` to `position`, the code gets `undefined` and may calculate zero or wrong points without any error. The player sees a ranking that looks correct but has wrong numbers. | medium | high, inconsistent ranking | high | low | contract test on a fixture; module test with a fixture that has a renamed field expects an error, not points | validate the structure of the response in the module that receives data from Jolpica; never overwrite correct data with bad data |
| 2 | If two accounts with the same nickname are created (parallel creation, Jan/jan, Łukasz/łukasz), the ranking shows two players under one name. | medium | high, breaks rankings and points | high | medium | API and concurrency test | unique index in the database on the normalised nickname, not only a check in code |
| 3 | If Jolpica returns 503 during the hourly ranking recalculation, saving results is interrupted halfway and only part of the results is recalculated. | high | medium, temporary effect, retry in the next hour | medium | high | integration tests with fixtures; simulated 503, timeout, broken JSON | recalculate in a single transaction and retry on the next hourly run |
| 4 | If the server and the browser have different clocks, a player submitting at the start boundary gets status 200 or 403. A prediction sent at T-1s in the browser may reach the server at T+0.3s and be rejected. This follows the rule, but the player sees it as a bug. | high | medium, affects one prediction of one player | medium | high | unit, API and E2E tests | the server decides using its own clock (UTC); the start time is stored in UTC; the countdown is based on server time; the server clock is synchronised with NTP |

## 3. Test pyramid

Rule: I test each rule at the lowest level that can see it; higher levels only check what the lower levels cannot see.

**Scoring: 78 points for a perfect podium**
- Unit tests (Vitest): points calculation is a pure function.
- Integration tests: the hourly recalculation and the freeze after 7 days.

**Time boundary: T-1s accepted, T and T+1s rejected**
- Unit tests: the boundary decision, with an injected clock.
- API tests: status 403 and the message.
- E2E tests: the countdown and the message in the interface.

**Account creation**
- Unit tests: nickname length 3/4/20/21 and PIN length 3/4/8/9, allowed characters, nickname normalisation (łukasz/Łukasz).
- API tests: statuses 200 ("Repeat PIN"), 201 ("Account created") and 400 (invalid data or two different PINs), the messages, and the hashed PIN.
- E2E tests: navigation in the browser, i.e. moving on to the login window.

## 4. E2E scenarios and Page Object Model

All scenarios use data from fixtures and a time set with the injectable clock.

1. A player creates an account, sees the login window and logs in.
2. A player predicts the same driver twice and sees an error message.
3. A player edits a saved prediction and sees the prediction with the changed data.
4. A player deletes their prediction and sees empty fields.
5. A player predicts results when the deadline passes and sees the message "Predictions are closed".
6. After a race, a player opens the race ranking and sees their own row with position and points (details below).

Page Object Model pages:

**LoginPage** (login and account creation in one window)
- actions: `enterNickname`, `enterPin`, `goToConfirmation`, `repeatPin`, `submit` (after login, goes to `SeasonRankingPage`)
- methods: `createAccount(nickname, pin)` (after 201 stays on `LoginPage`), `logIn(nickname, pin)`
- reads: `errorMessage` (also the account lockout message), `repeatPinMessage`

**GrandPrixPredictionPage**
- actions: `selectDriver(position, driver)`, `selectConstructor(position, constructor)`, `clickSave` (stays on `GrandPrixPredictionPage`), `clickEdit` (stays on `GrandPrixPredictionPage`), `clickDelete` (goes to `ConfirmDeleteDialog`)
- methods: `submitPrediction(firstDriverAndConstructor, secondDriverAndConstructor, thirdDriverAndConstructor)`, `editPrediction(firstDriverAndConstructor, secondDriverAndConstructor, thirdDriverAndConstructor)`, `deletePrediction` = `clickDelete` + `confirmDelete` (ends on `GrandPrixPredictionPage`)
- reads: `errorMessage`, `driversOnPositions`, `areAllFieldsEmpty`, `predictionDeadline`, `countdown`

**ConfirmDeleteDialog**
- actions: `confirmDelete` (goes to `GrandPrixPredictionPage`), `cancelDelete` (goes to `GrandPrixPredictionPage`)

**SeasonRankingPage**
- actions: `selectRace(race)` (goes to `RaceRankingPage`)
- reads: `rankingTable` (position, nickname, points), `rowFor(nickname)` (position, points), `racesList` (race names to choose from), `statusMessage`

**RaceRankingPage**
- actions: `goBackToSeasonRanking` (goes to `SeasonRankingPage`)
- reads: `rankingTable` (position, nickname, points), `rowFor(nickname)` (position, points), `statusMessage`

There is no `ChampionPredictionPage`: champion predictions are covered by unit tests (points, bonuses) and API tests (statuses, messages, time window), and the E2E suite does not repeat them (see the test pyramid rule).

**Scenario 6: race ranking after the race**

Data: `results-race-base.json`, final podium A, B, C. Two players: `anna` predicted A, B, C; `bob` predicted A, C, B.
1. Log in as `anna` (`LoginPage.logIn`); the test lands on `SeasonRankingPage`.
2. `SeasonRankingPage.selectRace("<race name>")` goes to `RaceRankingPage`.
3. `RaceRankingPage.rowFor("anna")`: expected position 1, 78 points (25 + 18 + 15 + 20 for the perfect podium).
4. `RaceRankingPage.rowFor("bob")`: expected position 2, 42 points (25 for A + 9 for B, who finished 2nd + 8 for C, who finished 3rd).

## 5. Test data and clock

Clock: a `clock.now()` dependency plus a test endpoint `POST /test/clock`, available only when `NODE_ENV=test`. The server decides whether a prediction is accepted, so the fake clock must be on the server side; the browser clock is not enough.

- The module that talks to Jolpica has an interface and two implementations, selected by `F1_DATA=fixtures`.
- A separate SQLite database for tests, cleaned before each test.
- `POST /test/clock` returns 404 in production, and there is one API test for it.

| File | Purpose | Source |
| --- | --- | --- |
| `calendar-2026-before.json` | calendar with the Saudi Arabian Grand Prix (19.04) | Issues 5, 6 |
| `calendar-2026-after.json` | calendar without it, with Sepang on 04.10 and Miami on 03.05 | Issues 5, 6 |
| `results-race-base.json` | result of one race (podium X, Y, Z) | Issue 7a |
| `results-race-corrected.json` | the same race after a disqualification (Y, Z, W) | Issues 7a, 7b |
| `results-season-final.json` | final standings of a season (champions) | Issue 7b |
| `jolpica-renamed-field.json` | the `position` field renamed | risk 1 |
| `season-history.json` | history of a selected circuit, Grand Prix or season | Issues 1, 2, 3 |
| `jolpica-truncated-json.json` | response with truncated JSON; the module must report an error and save nothing | risk 3 |

503 and timeout: a replaced implementation of the Jolpica module (a stub that throws an error), because a JSON file carries neither an HTTP status nor a delay.

## 6. Environment and CI

CI runs on every pull request to `main` and on every push to `main`; it uses fixtures only (`F1_DATA=fixtures`), so it does not depend on Jolpica.

The pipeline is one job with consecutive steps, so the environment is set up only once (checkout and installing dependencies):

1. type check (and lint, if added)
2. unit tests (Vitest)
3. API tests (Playwright)
4. E2E tests (Playwright with a browser)

Steps run from the cheapest and fastest to the slowest, so a failure stops the pipeline early.
