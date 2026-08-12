import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TIMELINE = [
  {
    year: '2019',
    title: 'Started Programming',
    desc: 'Wrote first lines of Python. Fell in love with the idea that you could build anything from nothing.',
    color: '#3b82f6',
    icon: '🐍',
  },
  {
    year: '2020',
    title: 'Learned Web Development',
    desc: 'Picked up React and Node.js. Built full-stack apps and realized the web was the most accessible platform on earth.',
    color: '#06b6d4',
    icon: '⚡',
  },
  {
    year: '2021',
    title: 'Explored Blockchain',
    desc: 'Dived into Solidity and Ethereum. Deployed first smart contract on testnet. Got hooked on the idea of trustless systems.',
    color: '#7c3aed',
    icon: '⛓️',
  },
  {
    year: '2022',
    title: 'Built AI Projects',
    desc: 'Integrated OpenAI APIs before it was mainstream. Built automation pipelines and early agent prototypes.',
    color: '#10b981',
    icon: '🤖',
  },
  {
    year: '2023',
    title: 'Hackathon Circuit',
    desc: 'Competed in 6+ hackathons. Won 3. Shipped ChainVault and HackBot under 48-hour sprints.',
    color: '#f59e0b',
    icon: '🏆',
  },
  {
    year: '2024',
    title: 'Production Software',
    desc: 'Building software that handles real load — NeuroFlow processes 10k+ requests/day, SolTrace indexes 3k+ TPS.',
    color: '#3b82f6',
    icon: '🚀',
  },
];

function TimelineItem({ item, index }: { item: typeof TIMELINE[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-0 w-full">
      {/* Left side */}
      <div className={`flex-1 ${isLeft ? 'flex justify-end pr-8 md:pr-12' : 'pr-8 md:pr-12 invisible'}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xs text-right"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-white/30">{item.year}</span>
            <h3 className="text-lg font-semibold text-white mt-1">{item.title}</h3>
            <p className="text-sm text-white/50 mt-1 leading-relaxed">{item.desc}</p>
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="relative flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: 'backOut' }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 border-white/5 shadow-lg"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${item.color}33, ${item.color}11)`,
            boxShadow: `0 0 20px ${item.color}33`,
            borderColor: `${item.color}44`,
          }}
        >
          {item.icon}
        </motion.div>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={visible ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-px h-16 origin-top"
          style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)` }}
        />
      </div>

      {/* Right side */}
      <div className={`flex-1 ${!isLeft ? 'flex justify-start pl-8 md:pl-12' : 'pl-8 md:pl-12 invisible'}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xs"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-white/30">{item.year}</span>
            <h3 className="text-lg font-semibold text-white mt-1">{item.title}</h3>
            <p className="text-sm text-white/50 mt-1 leading-relaxed">{item.desc}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-5"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">About</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Journey
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Every milestone was a doorway. Here's how I got here.
          </p>
        </motion.div>

        <div className="relative flex flex-col">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.2) 10%, rgba(59,130,246,0.2) 90%, transparent)' }} />

          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
