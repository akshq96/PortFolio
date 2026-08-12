import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  category: string;
  years: number;
  projects: number;
  confidence: number;
  desc: string;
  color: string;
  x: number;
  y: number;
  size: number;
}

const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', years: 3, projects: 12, confidence: 92, desc: 'Primary framework for all UI work. Deep knowledge of hooks, context, and perf patterns.', color: '#06b6d4', x: 18, y: 20, size: 1.2 },
  { name: 'Next.js', category: 'Frontend', years: 2, projects: 7, confidence: 87, desc: 'App Router, SSR, ISR, edge functions. Ships most of my production web work.', color: '#3b82f6', x: 30, y: 12, size: 1.1 },
  { name: 'TypeScript', category: 'Frontend', years: 3, projects: 14, confidence: 93, desc: 'Types everywhere. I refuse to ship untyped code to production.', color: '#60a5fa', x: 14, y: 38, size: 1.15 },
  { name: 'Tailwind', category: 'Frontend', years: 3, projects: 10, confidence: 90, desc: "Utility-first CSS. Faster than any other styling approach I've used.", color: '#38bdf8', x: 26, y: 32, size: 1.0 },
  // Backend
  { name: 'Node.js', category: 'Backend', years: 3, projects: 9, confidence: 86, desc: 'Event-loop internals, streams, clustering. My go-to for APIs.', color: '#4ade80', x: 50, y: 18, size: 1.15 },
  { name: 'Rust', category: 'Backend', years: 1.5, projects: 3, confidence: 70, desc: 'Ownership model clicked fast. Used for performance-critical engines and Solana programs.', color: '#fb923c', x: 44, y: 34, size: 1.0 },
  { name: 'Express', category: 'Backend', years: 3, projects: 8, confidence: 85, desc: 'Minimal, flexible. Built dozens of REST and middleware layers with it.', color: '#86efac', x: 56, y: 30, size: 0.95 },
  // Database
  { name: 'PostgreSQL', category: 'Database', years: 2, projects: 6, confidence: 80, desc: 'ACID compliance, complex joins, Drizzle ORM. Production-grade data.', color: '#818cf8', x: 38, y: 52, size: 1.0 },
  { name: 'MongoDB', category: 'Database', years: 2, projects: 5, confidence: 75, desc: 'Flexible schema for rapid prototyping. Aggregation pipelines for analytics.', color: '#4ade80', x: 26, y: 60, size: 0.9 },
  { name: 'Redis', category: 'Database', years: 1.5, projects: 4, confidence: 72, desc: 'Caching, pub/sub, session store. Shaved 300ms off HackBot response times.', color: '#f87171', x: 46, y: 64, size: 0.9 },
  // Blockchain
  { name: 'Solana', category: 'Blockchain', years: 1.5, projects: 4, confidence: 72, desc: 'Anchor framework, PDA architecture, SPL tokens. Built ChainVault on it.', color: '#a78bfa', x: 70, y: 22, size: 1.1 },
  { name: 'Solidity', category: 'Blockchain', years: 1.5, projects: 4, confidence: 70, desc: 'EVM, storage layout, reentrancy guards. Audited my own contracts.', color: '#c084fc', x: 80, y: 14, size: 1.0 },
  { name: 'Ethereum', category: 'Blockchain', years: 1.5, projects: 3, confidence: 68, desc: 'L2 bridges, ERC standards, Foundry testing. DeFi protocol mechanics.', color: '#818cf8', x: 74, y: 38, size: 0.95 },
  // AI
  { name: 'OpenAI', category: 'AI', years: 2, projects: 8, confidence: 88, desc: 'Function calling, streaming, embeddings, fine-tuning. Built before ChatGPT launched.', color: '#34d399', x: 62, y: 54, size: 1.1 },
  { name: 'AI Agents', category: 'AI', years: 1.5, projects: 5, confidence: 80, desc: 'ReAct loops, tool use, memory systems. NeuroFlow is the culmination.', color: '#6ee7b7', x: 74, y: 60, size: 1.05 },
  { name: 'LangChain', category: 'AI', years: 1, projects: 3, confidence: 75, desc: 'Chains, RAG pipelines, vector stores. Used when the plumbing matters more than the model.', color: '#10b981', x: 84, y: 50, size: 0.9 },
  // Tools
  { name: 'Docker', category: 'Tools', years: 2, projects: 7, confidence: 78, desc: 'Multi-stage builds, compose stacks, container networking.', color: '#7dd3fc', x: 88, y: 28, size: 0.9 },
  { name: 'Git', category: 'Tools', years: 4, projects: 20, confidence: 95, desc: "Rebase, bisect, reflog. I've recovered from things other people call data loss.", color: '#f97316', x: 14, y: 70, size: 1.0 },
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: '#06b6d4',
  Backend: '#4ade80',
  Database: '#818cf8',
  Blockchain: '#a78bfa',
  AI: '#34d399',
  Tools: '#f97316',
};

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Blockchain', 'AI', 'Tools'];

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-5"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Stack</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Technology Constellation
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Hover any node to explore — years, projects, and what I actually know.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat
                  ? 'border-primary/50 text-primary bg-primary/10'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Constellation area */}
        <div className="relative w-full" style={{ height: '520px' }}>
          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {filtered.map((skill, i) =>
              filtered.slice(i + 1, i + 3).map((target, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={`${skill.x}%`} y1={`${skill.y}%`}
                  x2={`${target.x}%`} y2={`${target.y}%`}
                  stroke={skill.color}
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
              ))
            )}
          </svg>

          {/* Skill nodes */}
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="absolute"
              style={{ left: `${skill.x}%`, top: `${skill.y}%`, zIndex: 10 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: 'backOut' }}
            >
              <motion.div
                className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                whileHover={{ scale: 1.3 }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-40"
                  style={{ backgroundColor: skill.color, transform: 'scale(1.5)' }}
                />
                {/* Node */}
                <div
                  className="relative flex items-center justify-center rounded-full border font-mono font-bold text-white text-xs shadow-lg"
                  style={{
                    width: `${52 * skill.size}px`,
                    height: `${52 * skill.size}px`,
                    background: `radial-gradient(circle at 30% 30%, ${skill.color}44, ${skill.color}11)`,
                    borderColor: `${skill.color}55`,
                    fontSize: `${11 * skill.size}px`,
                    boxShadow: `0 0 16px ${skill.color}33`,
                  }}
                >
                  {skill.name.length > 7 ? skill.name.slice(0, 5) + '…' : skill.name}
                </div>
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {activeSkill?.name === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute z-50 glass-card rounded-xl p-4 w-56 pointer-events-none"
                    style={{
                      left: skill.x > 65 ? 'auto' : '60%',
                      right: skill.x > 65 ? '60%' : 'auto',
                      top: skill.y > 55 ? 'auto' : '60%',
                      bottom: skill.y > 55 ? '60%' : 'auto',
                      borderColor: `${skill.color}33`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white text-sm">{skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `${skill.color}22`, color: skill.color }}>
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-3">{skill.desc}</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        { label: 'Years', val: `${skill.years}y` },
                        { label: 'Projects', val: skill.projects },
                        { label: 'Confidence', val: `${skill.confidence}%` },
                      ].map(({ label, val }) => (
                        <div key={label}>
                          <div className="text-sm font-bold" style={{ color: skill.color }}>{val}</div>
                          <div className="text-[10px] text-white/30 font-mono">{label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Confidence bar */}
                    <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.confidence}%`, backgroundColor: skill.color }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-4">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-white/30 font-mono">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
