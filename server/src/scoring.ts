const POINTS = [25, 18, 15];
const PERFECT_PODIUM_BONUS = 20;

export function calculatePodiumPoints(
  predicted: string[],
  actual: string[],
): number {
  let points = 0;
  let exactHits = 0;

  for (let i = 0; i < POINTS.length; i++) {
    if (predicted[i] === actual[i]) {
      points += POINTS[i];
      exactHits++;
    } else {
      const finishedAt = actual.indexOf(predicted[i]);
      if (finishedAt !== -1) {
        points += Math.ceil(POINTS[finishedAt] / 2);
      }
    }
  }

  if (exactHits === POINTS.length) {
    points += PERFECT_PODIUM_BONUS;
  }

  return points;
}

export type ChampionPrediction = { driver: string; team: string };

const CHAMPION_BONUS_POINTS = 50;

export function calculateChampionBonus(
  predicted: ChampionPrediction,
  actual: ChampionPrediction,
): number {
  let points = 0;

  if (predicted.driver === actual.driver) {
    points += CHAMPION_BONUS_POINTS;
  }
  if (predicted.team === actual.team) {
    points += CHAMPION_BONUS_POINTS;
  }

  return points;
}