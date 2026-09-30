'use client';

import { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Map as MapLibreMap } from 'maplibre-gl';
import { region } from '@/data/configurator';
import { convexHull, regionBounds, showroomCoord, villageCoords } from '@/lib/regionGeo';

// Gratis vectorkaart zonder API-sleutel, ook commercieel toegestaan.
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

/** Werkgebied iets ruimer dan de buitenste dorpen. */
function areaPolygon(): [number, number][] {
  const pts = region.villages.map((v) => villageCoords[v]).filter(Boolean);
  const hull = convexHull(pts);
  const cx = hull.reduce((s, p) => s + p[0], 0) / hull.length;
  const cy = hull.reduce((s, p) => s + p[1], 0) / hull.length;
  const grown = hull.map(([x, y]) => [cx + (x - cx) * 1.12, cy + (y - cy) * 1.35] as [number, number]);
  return [...grown, grown[0]];
}

function accentFrom(el: HTMLElement) {
  const v = getComputedStyle(el).getPropertyValue('--color-accent-bright').trim();
  return v ? `rgb(${v.split(/\s+/).join(',')})` : '#f5a623';
}

/**
 * Interactieve regiokaart (MapLibre + OpenFreeMap). Wordt pas geladen als
 * hij getoond wordt. Kleurt mee met het actieve merk via --color-accent-bright.
 */
export function RegionMap({ brandKey }: { brandKey?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (!el) return;
    const timeout = setTimeout(() => !cancelled && setStatus((s) => (s === 'ready' ? s : 'failed')), 12000);

    (async () => {
      try {
        const maplibregl = (await import('maplibre-gl')).default;
        if (cancelled) return;
        const map = new maplibregl.Map({
          container: el,
          style: STYLE_URL,
          bounds: regionBounds,
          fitBoundsOptions: { padding: 16 },
          attributionControl: { compact: true },
          scrollZoom: false,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
        });
        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

        map.on('error', () => !cancelled && setStatus((s) => (s === 'ready' ? s : 'failed')));
        map.on('load', () => {
          if (cancelled) return;
          const accent = accentFrom(el);
          map.addSource('werkgebied', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: { type: 'Polygon', coordinates: [areaPolygon()] },
            },
          });
          map.addLayer({
            id: 'werkgebied-fill',
            type: 'fill',
            source: 'werkgebied',
            paint: { 'fill-color': accent, 'fill-opacity': 0.12 },
          });
          map.addLayer({
            id: 'werkgebied-line',
            type: 'line',
            source: 'werkgebied',
            paint: { 'line-color': accent, 'line-width': 1.5, 'line-dasharray': [2, 2] },
          });
          map.addSource('dorpen', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: region.villages
                .filter((v) => villageCoords[v])
                .map((v) => ({
                  type: 'Feature' as const,
                  properties: { name: v },
                  geometry: { type: 'Point' as const, coordinates: villageCoords[v] },
                })),
            },
          });
          map.addLayer({
            id: 'dorpen-dot',
            type: 'circle',
            source: 'dorpen',
            paint: {
              'circle-radius': 4,
              'circle-color': accent,
              'circle-stroke-color': '#ffffff',
              'circle-stroke-width': 1.5,
            },
          });
          map.addLayer({
            id: 'dorpen-label',
            type: 'symbol',
            source: 'dorpen',
            layout: {
              'text-field': ['get', 'name'],
              'text-font': ['Noto Sans Regular'],
              'text-size': 11,
              'text-offset': [0, 0.9],
              'text-anchor': 'top',
              'text-optional': true,
            },
            paint: { 'text-color': '#33363b', 'text-halo-color': '#ffffff', 'text-halo-width': 1.4 },
          });

          // Showroom als eigen marker
          const pin = document.createElement('div');
          pin.className = 'region-map-showroom';
          pin.setAttribute('aria-label', 'Showroom adviba, Boven-Leeuwen');
          new maplibregl.Marker({ element: pin, anchor: 'center' })
            .setLngLat(showroomCoord)
            .setPopup(
              new maplibregl.Popup({ offset: 14, closeButton: false }).setHTML(
                '<strong>Showroom adviba</strong><br/>Expeditieweg 10-14, Boven-Leeuwen'
              )
            )
            .addTo(map);

          setStatus('ready');
        });
      } catch {
        if (!cancelled) setStatus('failed');
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Merkkleur wisselt → kaart kleurt mee
  useEffect(() => {
    const map = mapRef.current;
    const el = ref.current;
    if (!map || !el || status !== 'ready') return;
    const accent = accentFrom(el);
    map.setPaintProperty('werkgebied-fill', 'fill-color', accent);
    map.setPaintProperty('werkgebied-line', 'line-color', accent);
    map.setPaintProperty('dorpen-dot', 'circle-color', accent);
  }, [brandKey, status]);

  return (
    <div className="relative h-full w-full">
      <div ref={ref} className="h-full w-full" />
      {status !== 'ready' && (
        <div className="absolute inset-0 grid place-items-center bg-canvas p-4 text-center">
          {status === 'loading' ? (
            <span className="text-[13px] text-ink-muted">Kaart laden…</span>
          ) : (
            <div>
              <div className="text-[13px] font-medium text-ink">Ons werkgebied</div>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
                {region.villages.join(' · ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
