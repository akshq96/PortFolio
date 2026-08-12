import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroScene } from '@/components/sections/HeroScene';
import { Github, Linkedin, Twitter, Mail, ExternalLink, Download } from 'lucide-react';

const BOOT_LINES = [
  { text: '> initializing developer profile...', delay: 0 },
  { text: '> loading skills database... [OK]', delay: 60 },
  { text: '> mounting project repository... [OK]', delay: 120 },
  { text: '> connecting to GitHub API... [OK]', delay: 180 },
  { text: '> compiling experience records... [OK]', delay: 240 },
  { text: '> all systems nominal. welcome.', delay: 300 },
];

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/akshitraj', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/akshitraj', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/akshitraj', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@akshitraj.com', label: 'Email' },
];

function BootTerminal({ onDone }: { onDone: () => void }) {
  // Render useful content immediately so a fresh preview never looks blank.
  const [visibleLines, setVisibleLines] = useState<number[]>([0]);
  const [progress, setProgress] = useState(17);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      if (i === 0) return;

      timers.push(setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        if (i === BOOT_LINES.length - 1) {
          timers.push(setTimeout(onDone, 60));
        }
      }, line.delay));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const bar = Math.round((progress / 100) * 32);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-3 text-xs font-mono text-white/30">akshit@workstation ~ bash</span>
        </div>
        <div className="p-6 space-y-2 min-h-[200px]">
          {BOOT_LINES.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`font-mono text-sm ${
                    line.text.includes('[OK]')
                      ? 'text-green-400/80'
                      : line.text.includes('welcome')
                      ? 'text-primary'
                      : 'text-white/60'
                  }`}
                >
                  {line.text}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
          {progress < 100 && (
            <div className="font-mono text-xs text-white/40 pt-2">
              [{Array(bar).fill('█').join('')}{Array(32 - bar).fill('░').join('')}] {progress}%
            </div>
          )}
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-xs text-primary pt-2"
            >
              [{Array(32).fill('█').join('')}] 100% — ready.
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [booted, setBooted] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-background/80 pointer-events-none z-[1]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <AnimatePresence>
          {!booted ? (
            <motion.div key="boot" className="w-full flex flex-col items-center gap-8">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs uppercase tracking-widest text-primary mb-2"
              >
                System Boot
              </motion.p>
              <BootTerminal onDone={() => setBooted(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="hero"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Availability + location */}
              <motion.div
                className="flex items-center gap-4 flex-wrap justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs font-mono text-green-400">Available for work</span>
                </div>
                <span className="text-xs font-mono text-white/30">📍 India</span>
                <span className="text-xs font-mono text-white/30">🕐 Building at 2am</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="text-white">Hi, I'm </span>
                <span
                  className="text-glow"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 50%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Akshit Raj.
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-lg md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                I build software that{' '}
                <span className="text-primary font-medium">thinks</span>,{' '}
                <span className="text-accent font-medium">automates work</span>, and{' '}
                <span className="text-secondary font-medium">solves real-world problems</span>.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex items-center gap-4 flex-wrap justify-center mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group relative px-6 py-3 rounded-xl font-medium text-sm overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                >
                  <span className="relative z-10 text-white flex items-center gap-2">
                    View Projects <ExternalLink className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #60a5fa, #a855f7)' }} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-6 py-3 rounded-xl font-medium text-sm glass border border-white/10 text-white hover:border-primary/50 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </a>
                <a
                  href="/resume.pdf"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Download className="w-4 h-4" /> Resume
                </a>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                className="flex items-center gap-3 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="group p-3 rounded-xl glass border border-white/5 hover:border-primary/30 text-white/50 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll cue */}
      {booted && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-widest font-mono text-white/20">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  );
}
