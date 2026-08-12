import { motion } from 'framer-motion';

const STATS = [
  { label: 'Repositories', value: '47', icon: '📁' },
  { label: 'Total Stars', value: '312', icon: '⭐' },
  { label: 'Contributions', value: '1,847', icon: '🔥' },
  { label: 'Followers', value: '234', icon: '👥' },
];

const PINNED = [
  { name: 'neuroflow', desc: 'Visual AI workflow engine with Rust execution backend', stars: 142, lang: 'TypeScript', color: '#3b82f6' },
  { name: 'chainvault', desc: 'Institutional-grade Solana asset custody protocol', stars: 98, lang: 'Rust', color: '#7c3aed' },
  { name: 'hackbot', desc: 'Sub-400ms code assistant with full monorepo indexing', stars: 71, lang: 'TypeScript', color: '#06b6d4' },
];

const LANG_BREAKDOWN = [
  { lang: 'TypeScript', pct: 42, color: '#3b82f6' },
  { lang: 'Rust', pct: 22, color: '#fb923c' },
  { lang: 'JavaScript', pct: 16, color: '#fbbf24' },
  { lang: 'Solidity', pct: 12, color: '#a78bfa' },
  { lang: 'Python', pct: 8, color: '#4ade80' },
];

// Generate a fake but realistic contribution grid
function generateContribGrid() {
  const weeks = 52;
  const days = 7;
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      const rand = Math.random();
      const activity = w > 38 ? Math.random() * 0.9 : rand; // recent weeks denser
      if (activity > 0.8) return 4;
      if (activity > 0.65) return 3;
      if (activity > 0.5) return 2;
      if (activity > 0.35) return 1;
      return 0;
    })
  );
}

const GRID = generateContribGrid();

const LEVEL_COLORS: Record<number, string> = {
  0: 'rgba(255,255,255,0.04)',
  1: '#1e3a5f',
  2: '#1d4ed8',
  3: '#3b82f6',
  4: '#60a5fa',
};

export function GitHubStats() {
  return (
    <section id="github" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">GitHub</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Code Activity</h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map(({ label, value, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
              <div className="text-xs font-mono text-white/40 mt-1 uppercase tracking-widest">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 mb-8 overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-mono text-white/50">1,847 contributions in the last year</span>
            <a href="https://github.com/akshitraj" target="_blank" rel="noreferrer"
              className="text-xs font-mono text-primary hover:underline">
              @akshitraj ↗
            </a>
          </div>
          <div className="flex gap-[3px]">
            {GRID.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((level, d) => (
                  <div
                    key={d}
                    className="w-[11px] h-[11px] rounded-sm transition-all duration-200 hover:scale-125 cursor-default"
                    style={{ backgroundColor: LEVEL_COLORS[level] }}
                    title={`Level ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[10px] text-white/20 font-mono">Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className="w-[11px] h-[11px] rounded-sm" style={{ backgroundColor: LEVEL_COLORS[l] }} />
            ))}
            <span className="text-[10px] text-white/20 font-mono">More</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pinned repos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-4">Pinned</h3>
            <div className="flex flex-col gap-3">
              {PINNED.map(({ name, desc, stars, lang, color }) => (
                <a
                  key={name}
                  href={`https://github.com/akshitraj/${name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card rounded-xl p-4 hover:scale-[1.01] transition-all duration-300 group"
                  style={{ borderColor: `${color}22` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm text-white group-hover:text-primary transition-colors">{name}</span>
                    <span className="text-xs text-white/30 flex items-center gap-1">⭐ {stars}</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[10px] font-mono text-white/30">{lang}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Language breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-4">Languages</h3>
            <div className="glass-card rounded-xl p-6">
              {/* Stacked bar */}
              <div className="h-3 rounded-full overflow-hidden flex mb-6">
                {LANG_BREAKDOWN.map(({ lang, pct, color }) => (
                  <motion.div
                    key={lang}
                    style={{ backgroundColor: color, width: `${pct}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    title={`${lang}: ${pct}%`}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {LANG_BREAKDOWN.map(({ lang, pct, color }) => (
                  <div key={lang} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-sm text-white/70 flex-1 font-mono">{lang}</span>
                    <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
