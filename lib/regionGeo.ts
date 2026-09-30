/**
 * Coördinaten (lengtegraad, breedtegraad) van de kernen in het werkgebied.
 * Dorpscentra, bij benadering; voor een regiokaart ruim nauwkeurig genoeg.
 */
export const villageCoords: Record<string, [number, number]> = {
  Heerewaarden: [5.395, 51.82],
  Rossum: [5.334, 51.801],
  Alphen: [5.465, 51.822],
  Dreumel: [5.431, 51.846],
  Maasbommel: [5.529, 51.818],
  Wamel: [5.464, 51.875],
  'Beneden-Leeuwen': [5.51, 51.89],
  'Boven-Leeuwen': [5.55, 51.894],
  Altforst: [5.535, 51.862],
  Appeltern: [5.56, 51.833],
  Puiflijk: [5.587, 51.872],
  Afferden: [5.642, 51.883],
  Deest: [5.672, 51.892],
  Druten: [5.605, 51.888],
  Horssen: [5.603, 51.86],
  Bergharen: [5.672, 51.852],
  Hernen: [5.676, 51.839],
  Leur: [5.692, 51.824],
  Batenburg: [5.623, 51.822],
  Wijchen: [5.725, 51.808],
  Winssen: [5.702, 51.878],
  Beuningen: [5.766, 51.861],
  Weurt: [5.816, 51.856],
  Ewijk: [5.74, 51.874],
};

/** Showroom adviba, Expeditieweg 10-14, Boven-Leeuwen. */
export const showroomCoord: [number, number] = [5.556, 51.889];

export const regionBounds: [[number, number], [number, number]] = [
  [5.31, 51.79],
  [5.84, 51.905],
];

/** Convexe omhullende (monotone chain) voor de werkgebied-vlak. */
export function convexHull(points: [number, number][]): [number, number][] {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (const p of [...pts].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
