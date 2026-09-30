import fs from 'node:fs';
import path from 'node:path';
import { sortProjects, toProject } from '@/data/projects';
import { AdvibaLogo } from './AdvibaLogo';
import { ProjectSlider } from './ProjectSlider';

/** Alle beelden in /public/projects, opgehaald tijdens de build. */
function loadProjects() {
  const dir = path.join(process.cwd(), 'public', 'projects');
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  } catch {
    // map ontbreekt: sectie verbergen
  }
  return sortProjects(files).map(toProject);
}

export function ProjectGallery() {
  const projects = loadProjects();
  if (projects.length === 0) return null;

  return (
    <section
      id="projecten"
      aria-labelledby="projecten-titel"
      className="overflow-hidden border-t border-line bg-surface/60"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:mb-10 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Bekijk onze projecten
            </div>
            <h2
              id="projecten-titel"
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[26px] font-semibold leading-tight tracking-tight text-ink md:text-[36px]"
            >
              Echt werk van
              <AdvibaLogo className="h-7 md:h-10" />
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ink-muted md:text-right">
            Geen stockfoto&apos;s: woningen in de regio waar adviba zelf heeft ingemeten en
            gemonteerd. Sleep, filter of klik voor groot.
          </p>
        </div>

        <ProjectSlider projects={projects} />
      </div>
    </section>
  );
}
