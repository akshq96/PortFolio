import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: '⌂' },
  { id: 'about', label: 'About', icon: '◎' },
  { id: 'skills', label: 'Skills', icon: '✦' },
  { id: 'projects', label: 'Projects', icon: '▣' },
  { id: 'github', label: 'GitHub', icon: '◈' },
  { id: 'fun', label: 'More', icon: '⊞' },
  { id: 'contact', label: 'Contact', icon: '◉' },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Dock() {
  const [active, setActive] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className="flex items-end gap-1 px-3 py-2 rounded-2xl border border-white/10 backdrop-blur-xl"
            style={{ background: 'rgba(5,5,10,0.85)', boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' }}
          >
            {NAV_ITEMS.map(({ id, label, icon }) => {
              const isActive = active === id;
              const isHovered = hovered === id;

              return (
                <div
                  key={id}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 whitespace-nowrap"
                      >
                        <span className="text-[10px] font-mono text-white">{label}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dock item */}
                  <motion.button
                    onClick={() => scrollTo(id)}
                    className="relative flex items-center justify-center rounded-xl transition-colors duration-200"
                    animate={{
                      width: isHovered ? 52 : isActive ? 44 : 40,
                      height: isHovered ? 52 : isActive ? 44 : 40,
                      marginBottom: isHovered ? 8 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(124,58,237,0.2))'
                        : 'rgba(255,255,255,0.05)',
                      border: isActive
                        ? '1px solid rgba(59,130,246,0.4)'
                        : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: isActive ? '0 0 12px rgba(59,130,246,0.2)' : 'none',
                    }}
                  >
                    <span className="text-base select-none" style={{ opacity: isActive || isHovered ? 1 : 0.4 }}>
                      {icon}
                    </span>
                  </motion.button>

                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
