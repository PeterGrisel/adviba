// Haalt de externe beelden (zie lib/remoteImages.ts) op naar public/img en
// schrijft lib/localImages.json. Faalt nooit de build: bij een fout blijft
// de externe URL in gebruik.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const src = await readFile(path.join(root, 'lib/remoteImages.ts'), 'utf8');
const commons = (f) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=2400`;

const entries = [...src.matchAll(/'([a-z0-9-]+)':\s*(?:commons\('([^']+)'\)|'([^']+)')/g)].map(
  ([, key, file, url]) => [key, file ? commons(file) : url]
);

const outDir = path.join(root, 'public/img');
await mkdir(outDir, { recursive: true });
const manifest = {};

await Promise.all(
  entries.map(async ([key, url]) => {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'MaasEnWaalConfigurator/1.0 (build; https://www.adviba.nl)' },
        signal: AbortSignal.timeout(30_000),
      });
      const type = res.headers.get('content-type') ?? '';
      if (!res.ok || !type.startsWith('image/')) throw new Error(`${res.status} ${type}`);
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
      await writeFile(path.join(outDir, `${key}.${ext}`), Buffer.from(await res.arrayBuffer()));
      manifest[key] = `/img/${key}.${ext}`;
      console.log(`✓ ${key}`);
    } catch (err) {
      console.warn(`! ${key}: ${err.message} — externe URL blijft in gebruik`);
    }
  })
);

await writeFile(path.join(root, 'lib/localImages.json'), JSON.stringify(manifest, null, 2) + '\n');
