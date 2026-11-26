const EXACT_POINTS = [25, 18, 15];

export function calculatePodiumPoints(
  predicted: string[],
  actual: string[],
): number {
  let points = 0;

  for (let i = 0; i < EXACT_POINTS.length; i++) {
    if (predicted[i] === actual[i]) {
      points += EXACT_POINTS[i];
    }
  }

  return points;
}