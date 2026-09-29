'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Vloeiend, "zwevend" scrollen (Lenis) voor muis/trackpad. Touch blijft native,
 * en bij prefers-reduced-motion schakelt Lenis zelf het smoothen uit.
 * Anchor-links (#configureer) scrollen mee; ruimte voor de sticky header komt uit scroll-mt.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      autoRaf: true,
      anchors: true, // respecteert scroll-margin (scroll-mt) van het doel
      stopInertiaOnNavigate: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
