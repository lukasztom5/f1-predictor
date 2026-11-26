const POINTS = [25, 18, 15];

export function calculatePodiumPoints(
  predicted: string[],
  actual: string[],
): number {
  let points = 0;

  for (let i = 0; i < POINTS.length; i++) {
    if (predicted[i] === actual[i]) {
      points += POINTS[i];
    } else {
      const finishedAt = actual.indexOf(predicted[i]);
      if (finishedAt !== -1) {
        points += Math.ceil(POINTS[finishedAt] / 2);
      }
    }
  }

  return points;
} 