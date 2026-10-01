'use client';

export type BrandVariant = 'zonwering' | 'rolluiken' | 'horren';

interface Props {
  className?: string;
  variant?: BrandVariant;
  onDark?: boolean;
}

/** Alle sub-merken in hetzelfde warme geel (wens adviba). */
const SUN_COLORS: Record<BrandVariant, string> = {
  zonwering: '#F5A623',
  rolluiken: '#F5A623',
  horren: '#F5A623',
};

/**
 * Maas en Waal huismerk — half zon achter huisdak.
 * Zon altijd warm geel. Icoon binnen het dak visualiseert
 * het product (zonluifel / rolluik-lamellen / horgaas + blaadje).
 */
export function BrandMark({
  className,
  variant = 'zonwering',
  onDark = false,
}: Props) {
  const stroke = onDark ? '#ffffff' : '#0b0f1a';
  const sun = SUN_COLORS[variant];

  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Zon — opkomende zon achter het dak */}
      <path d="M18 48 A22 22 0 0 1 62 48 Z" fill={sun} />

      {/* Huisdak — dikke stroke, warme peak */}
      <path
        d="M6 50 L45 14 L84 50"
        stroke={stroke}
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />

      {variant === 'zonwering' && (
        // Zonluifel — schuin-projecterende amber strips
        <g strokeLinecap="round" strokeWidth="5" stroke={sun}>
          <line x1="16" y1="56" x2="52" y2="72" />
          <line x1="16" y1="66" x2="52" y2="82" />
          <line x1="16" y1="76" x2="52" y2="92" />
        </g>
      )}

      {variant === 'rolluiken' && (
        // Rolluik — horizontale lamellen in een dun kader
        <g>
          <rect
            x="18"
            y="55"
            width="58"
            height="38"
            rx="2"
            stroke={stroke}
            strokeWidth="4"
            fill="none"
          />
          <g stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="63" x2="72" y2="63" />
            <line x1="22" y1="71" x2="72" y2="71" />
            <line x1="22" y1="79" x2="72" y2="79" />
            <line x1="22" y1="87" x2="72" y2="87" />
          </g>
        </g>
      )}

      {variant === 'horren' && (
        // Hor — dun raamkozijn + fijn mesh-grid + klein blaadje
        <g>
          <rect
            x="18"
            y="55"
            width="58"
            height="38"
            rx="2"
            stroke={stroke}
            strokeWidth="4"
            fill="none"
          />
          <g stroke={stroke} strokeWidth="1.2" opacity="0.85">
            <line x1="18" y1="62" x2="76" y2="62" />
            <line x1="18" y1="69" x2="76" y2="69" />
            <line x1="18" y1="76" x2="76" y2="76" />
            <line x1="18" y1="83" x2="76" y2="83" />
            <line x1="18" y1="90" x2="76" y2="90" />
            <line x1="26" y1="55" x2="26" y2="93" />
            <line x1="34" y1="55" x2="34" y2="93" />
            <line x1="42" y1="55" x2="42" y2="93" />
            <line x1="50" y1="55" x2="50" y2="93" />
            <line x1="58" y1="55" x2="58" y2="93" />
            <line x1="66" y1="55" x2="66" y2="93" />
          </g>
          {/* Blaadje, accent rechts onder */}
          <path
            d="M78 82 C 86 78, 92 82, 92 90 C 84 90, 78 88, 78 82 Z"
            fill={sun}
          />
          <path
            d="M80 86 L 90 88"
            stroke={onDark ? '#0b0f1a' : '#ffffff'}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      )}
    </svg>
  );
}
