import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const FRAMES = [
  {
    id: 1,
    title: "I start with the problem, not the stack.",
    support: "Most engineers reach for tools first. I map the system, identify the bottleneck, then choose the simplest solution that handles scale."
  },
  {
    id: 2,
    title: "I ship early, then refine.",
    support: "A working prototype beats a perfect plan. I've shipped AI agents in 3 days and blockchain contracts in a weekend hackathon. Speed builds confidence."
  },
  {
    id: 3,
    title: "I read the code, not just the docs.",
    support: "When something breaks at 2am, the source code is the only truth. I've debugged Solana runtimes, OpenAI streaming edge cases, and Drizzle ORM internals."
  },
  {
    id: 4,
    title: "I treat interfaces as engineering problems.",
    support: "Good UI isn't decoration. It's the API between human and system. I obsess over interaction models, not just visual polish."
  }
];

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const segment = rect.height / FRAMES.length;
    const idx = Math.min(Math.floor(relY / segment), FRAMES.length - 1);
    setActiveIndex(Math.max(0, idx));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">
      <div className="absolute top-12 left-8 md:left-24">
        <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">Process</span>
      </div>

      <div
        ref={containerRef}
        className="flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setActiveIndex(0); }}
      >
        {FRAMES.map((frame, i) => {
          const isActive = !isHovering ? i === 0 : activeIndex === i;
          return (
            <motion.div
              key={frame.id}
              className="py-9 border-b border-white/5 cursor-default select-none"
              animate={{ opacity: isActive ? 1 : 0.1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={() => setActiveIndex(i)}
            >
              <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight leading-tight">
                {frame.title}
              </h2>
              <div
                style={{
                  maxHeight: isActive ? '160px' : '0px',
                  overflow: 'hidden',
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? '12px' : '0px',
                  transition: 'max-height 0.35s ease, opacity 0.25s ease, margin-top 0.35s ease',
                }}
              >
                <p className="text-base md:text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
                  {frame.support}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
