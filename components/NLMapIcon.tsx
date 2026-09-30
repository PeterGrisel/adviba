/**
 * Mini-silhouet van Nederland met een stip op het Land van Maas en Waal.
 * Vereenvoudigd uit echte coördinaten; de stip ligt op ~5,55°O 51,86°N.
 */
export function NLMapIcon({ className = 'h-7 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 77 90" className={className} aria-hidden="true">
      <path
        d="M3.1 68.9 L5.7 62.6 L12.2 56.0 L15.9 50.6 L23.3 41.6 L26.0 32.0 L28.2 21.2 L35.3 21.5 L40.8 17.6 L44.5 10.1 L55.6 7.1 L68.5 6.5 L74.1 12.5 L74.1 20.0 L71.3 30.8 L65.2 33.2 L71.3 39.5 L65.2 47.0 L54.1 53.9 L51.0 56.6 L55.6 65.0 L53.4 74.0 L50.0 78.5 L53.4 83.0 L51.9 87.2 L46.4 87.2 L47.3 80.0 L42.7 72.5 L35.3 67.4 L29.7 65.9 L24.2 66.5 L19.6 68.9 L14.0 72.5 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="43.6" cy="54.2" r="13" className="nl-map-pulse fill-accent-bright" opacity="0.35" />
      <circle cx="43.6" cy="54.2" r="7" className="fill-accent-bright" stroke="#0b0f1a" strokeWidth="2.5" />
    </svg>
  );
}
