import { ImageResponse } from 'next/og';

export const alt = 'Zonwering, rolluiken & horren in Maas en Waal. Bereken je prijs in 2 minuten.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #0b0f1a 0%, #1c2130 100%)',
          color: '#f5efdf',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>maas en waal</div>
        <div style={{ display: 'flex', gap: 24, marginTop: 12, fontSize: 30, fontWeight: 700 }}>
          <span style={{ color: '#f5a623' }}>ZONWERING</span>
          <span style={{ color: '#f5a623' }}>ROLLUIKEN</span>
          <span style={{ color: '#f5a623' }}>HORREN</span>
        </div>
        <div style={{ marginTop: 56, fontSize: 44, lineHeight: 1.2, maxWidth: 900 }}>
          Bereken je prijs in 2 minuten, van Dreumel tot Ewijk.
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: '#9aa0ad' }}>Inmeting en montage door adviba</div>
      </div>
    ),
    size
  );
}
