# Specification

This document describes what the application does. The detailed acceptance criteria, with status codes, messages and test examples, are in the GitHub Issues named under each story. If a rule here and an Issue ever differ, the Issue is the newer source and this document must be updated.

## Global rules

- **Status codes.** 400 for invalid input, 401 for a guest, 403 for a logged-in user who is not allowed to do something or when something is closed, 404 when something does not exist.
- **Guests.** Browsing results (stories 1 to 3) is open to everyone. Everything else needs a login. A guest gets 401 and "This screen is available to logged-in users only".
- **Time.** All deadlines are decided by **server time** in UTC, never by the browser clock. A prediction is accepted only if the server time is strictly earlier than the scheduled start (T-1s accepted; T and T+1s rejected with 403 and "Predictions are closed"). Deadlines are shown to the player in local time with the zone, e.g. 15:00 CET.
- **"One week after the end of the season"** always means one week after the scheduled start of the last race of the season (2026: 06.12.2026 13:00 UTC, so 13.12.2026 13:00 UTC). It applies to the champion bonus (story 7b) and to the closing of reopened champion predictions (story 4).
- **Language.** The interface and API messages are in English.
- **Data source.** Race data comes from the Jolpica F1 API (successor of Ergast), isolated behind one module. Tests use fixtures and an injectable clock.

## 1. Season results

Issue: *Selected season results*

As a fan, I want to be able to view the results of a selected Formula 1 season.

- Shows the list of races, the winners (driver + constructor), the drivers' standings (from 1950) and the constructors' standings (from 1958).
- Seasons 1950 to 1957 show "No standings" for constructors.
- Races that have not taken place yet show "No results". Before the season starts, the list of races and "No results" are shown.
- A year in which no season was held (e.g. 1948, 2055), an empty parameter or a non-numeric value: 400.
- If the calendar of the next season is not confirmed: 400 and "Season not confirmed yet". Every season further ahead than the next one: 400.

## 2. Grand Prix results

Issue: *Grand Prix results*

As a fan, I want to see the results of a selected Grand Prix.

- Shows all winners: driver, team, circuit and year (e.g. British Grand Prix: Silverstone 1950, Brands Hatch 1976, Aintree 1957).
- If several drivers won in one year, all are listed (driver + constructor).
- "No results" for years in which the Grand Prix was not held (from 1950 to now).
- An unknown Grand Prix (e.g. Vietnamese) or a Polish name: 404. A missing name: 400.
- Names are matched exactly: "Monaco" works, "monaco" and "mo naco" return 404.

## 3. Circuit results

Issue: *Circuit results*

As a fan, I want to see the results of the races held at a selected circuit.

- Shows all winners: driver, team, Grand Prix and year (e.g. Nurburgring: German 1976, Luxembourg 1997, European 2007). Only the years in which a Grand Prix was held there are listed.
- If several drivers won in one year, or several Grand Prix were held in one year, all are listed.
- An old circuit name (e.g. Osterreichring, A1-Ring) returns the results of the circuit under its new name (Red Bull Ring), from the very beginning.
- Names without diacritics work (Nürburgring and Nurburgring both return 200).
- An unknown circuit or a Polish name: 404. A missing name: 400.

## 4. Predicting the World Champions

Issue: *Predicting the World Champions*

As a fan, I want to be able to predict the Drivers' Champion and the Constructors' Champion.

- The driver and the constructor are predicted separately. Each can be predicted only once, also after a correction of the standings. A second attempt: 403.
- Predictions open one week before the start of the season (07.03.2027 00:00 UTC for 2027).
- A driver or team that is not in the season (e.g. 2026 Daniel Ricciardo, 2026 Alfa Romeo): 400.
- Predicting closes (403) as soon as a title is decided: the leader's margin is greater than the total points still available in races and sprints. A margin equal to the points available, or smaller, keeps predicting open.
- If a result correction leaves the title undecided, predicting reopens, only for players who have not predicted yet, and closes one week after the start of the last race of the season (for 2026: 13.12.2026 13:00 UTC).
- Title tie-break: wins first, then second places, and so on.
- A champion prediction can be neither edited nor deleted (see story 6).

## 5. Predicting the podium

Issue: *Predicting the podium of the upcoming Grand Prix*

As a fan, I want to be able to predict the podium of the upcoming Grand Prix.

- Only the nearest race can be predicted. After a race starts, the next one opens (e.g. Las Vegas, then Qatar). A later race (e.g. Abu Dhabi 2026 while Las Vegas is next): 403 and "This Grand Prix is not open for predictions".
- After the start of the last Grand Prix in the calendar (06.12.2026) predicting is blocked (403) until the next calendar is confirmed. After that the first race can be predicted (14.03.2027).
- A player can predict a race only once: 403 and "You have already made a prediction". A driver can appear only once in a prediction: 400.
- A driver or team that is not in the race: 400 and "Driver or team not in the race". After a team is selected, its current drivers are shown.
- A Grand Prix that is not in the calendar: 404 and "This Grand Prix was never scheduled". A predicted Grand Prix removed from the calendar: 404 and "Grand Prix cancelled", the predictions are removed and the next race becomes the nearest one (Saudi Arabia, then Miami).
- A Grand Prix moved to another date and circuit is predicted according to the new start time (2026 Bahrain, now Sepang, 04.10.2026).
- Time boundary: see Global rules. Predicting during the race is rejected.

## 6. Editing and deleting predictions

Issue: *Editing and deleting predictions*

As a fan, I want to be able to edit or delete my predictions.

- Only the player's own predictions. Someone else's prediction: 403 and "You can edit or delete only your own predictions".
- Possible only before the scheduled start: edit 200, delete 204. After the start: 403 and "Predictions are closed".
- A champion prediction cannot be changed or deleted: 403 and "This prediction cannot be changed" / "This prediction cannot be deleted".
- After a delete all fields are reset and the player may predict again before the start.
- An edit follows the same validation as a new prediction (the same driver twice: 400 and "The same driver cannot be selected more than once"; a driver or team not in the race: 400; a missing driver: 400 and "All three podium positions are required").
- A prediction that does not exist: 404 and "Prediction not found". A cancelled Grand Prix: 404 and "Grand Prix cancelled".

## 7a. Race ranking

Issue: *Race ranking*

As a fan, I want to see the ranking of players after a race.

- Only players who predicted that race are in the ranking, including players with 0 points. It shows position, nickname and points.
- Scoring follows the FIA points system: an exact hit gives 25 (1st), 18 (2nd), 15 (3rd). A driver on the podium but in a different position gives half the points of the position where they **finished**, rounded up: 13, 9, 8. A driver not on the podium gives 0. A perfect podium adds 20 (maximum 78).
- Example: prediction P, Q, R; result Q, P, S gives 9 + 13 = 22 points. Two exact hits and one wrong position get no bonus (25 + 18 + 8 = 51).
- Ties: more perfect podiums first, then more exact hits. Tied players share a position and the next one is skipped (1, 2, 2, 4). Example: 78 pts (perfect podium), 33 pts (18+15, 2 hits), 33 pts (18+15, 2 hits), 33 pts (25+8, 1 hit), 15 pts: positions 1, 2, 2, 4, 5.
- Before the race: 200 and "The race has not started yet". During the race: 200 and "The race is in progress. Wait until it finishes".
- Results are recalculated every hour for 7 days after the start; after that the ranking is frozen. Example of a correction (winner disqualified): A 78, B 33, C 18 becomes B 30, A 22, C 13.
- A cancelled Grand Prix: 404 and "Grand Prix cancelled". A Grand Prix that does not exist: 404 and "This Grand Prix was never scheduled".

## 7b. Season ranking

Issue: *Season ranking*

As a fan, I want to see the ranking of players for the whole season.

- The season total is the sum of the race points for the races the player predicted. A race without a prediction does not affect the total. Example: 78 + 33 + (no prediction) = 111.
- Bonus: 50 points for the correct Drivers' Champion and 50 for the correct Constructors' Champion (100 in total), added one week after the start of the last race of the season (13.12.2026 13:00 UTC for 2026). Before that moment there is no bonus.
- Every player who predicted at least once is in the ranking, also a player who predicted only the champions, and also with 0 points.
- Ties and shared positions work as in story 7a. Example: 156 pts (2 perfect podiums, 6 hits), 103 pts (78+25: 1 perfect podium, 4 hits), 103 pts (78+25), 103 pts (15+15+33+40: no perfect podium, 6 hits), 43 pts, 15 pts: positions 1, 2, 2, 4, 5, 6.
- A race corrected within 7 days of its start changes the season total after the next hourly recalculation; after 7 days and 1 hour it no longer does (e.g. 78 + 33 = 111 becomes 78 + 30 = 108).
- Only the current season has a ranking. Timeline for 2026 and 2027:
  - until the start of the last race of 2026 (06.12.2026 13:00 UTC): table with the current standings,
  - from the end of that race to 13.12.2026 13:00 UTC: the 2026 table without champion bonuses,
  - from 13.12.2026: the 2026 table with bonuses and "The current season has ended",
  - from 07.03.2027 (champion predictions open): 2027 returns 200, "Place your predictions" and an empty table; 2026 returns 404 and "No ranking for this season",
  - from the start of the first race (14.03.2027): the 2027 table with the current standings,
  - 2027 before 07.03.2027, and any other season such as 1980 or 2028: 404 and "No ranking for this season".

## 8. Account

Issues: *Account creation* and *Login and lockout*

As a fan, I want to be able to use an account.

- There is one form for a nickname and a PIN. If the nickname exists, the form logs in. If it does not, the form starts creating an account: 200 and "Repeat PIN", and the account exists only after the PIN is repeated correctly (201 and "Account created"). After that the player goes to the login window. A typo in a nickname therefore creates a new account, which is why the PIN is confirmed.
- Nickname: 4 to 20 characters, unique regardless of letter case (JAN logs in to jan), shown as it was created. Letters (including Polish ones), digits and special characters are allowed; spaces and emoji are not (400 and "Nickname contains invalid characters"). HTML such as `<b>x</b>` is accepted and shown as plain text.
- PIN: 4 to 8 characters, letters a-z and digits (400 and "PIN may contain only letters and digits"). Two different PINs: 400 and "The two PINs do not match"; nothing is saved and the nickname stays free. The PIN is stored hashed and never returned.
- Login: valid nickname and PIN: 200 and the ranking page. Wrong PIN: 401 and "Invalid credentials".
- Lockout: the 5th wrong attempt starts a 10 minute lockout of that nickname only. The 6th attempt, even with the correct PIN, gets 403 and "Account locked for 10 minutes". Attempts during the lockout do not extend it. After 10 minutes login works and the counter is reset. A correct login resets the counter at any time.
- A forgotten PIN cannot be recovered; there is no "Forgot PIN" link.

## 9. Limitations and ideas for later

Issue: *Limitations and out-of-scope ideas*

Known limitations:
- formation lap or a delayed start: predicting closes at the scheduled time, not at the actual start,
- someone else's nickname can be locked with wrong PINs,
- a driver who withdraws before the start after being predicted gives 0 points; the player can change the prediction only until the start,
- no PIN recovery,
- a prediction sent at T-1s in the browser may reach the server at T+0.3s and be rejected.

Ideas for later: notifications, statistics (e.g. podium probability).
