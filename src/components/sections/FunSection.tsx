import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const QUOTES = [
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
];

const CURRENTLY_BUILDING = "NeuroFlow v2 — multi-agent orchestration with memory";
const CURRENT_FOCUS = "AI × Rust × Solana";

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ist = new Date(time.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const h = ist.getHours().toString().padStart(2, '0');
  const m = ist.getMinutes().toString().padStart(2, '0');
  const s = ist.getSeconds().toString().padStart(2, '0');
  const ampm = ist.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">India Standard Time</span>
      <div className="font-mono text-4xl font-bold text-white tracking-tighter">
        {h}:{m}
        <span className="text-primary">:{s}</span>
      </div>
      <span className="font-mono text-xs text-white/40">{ampm}</span>
    </div>
  );
}

function CoffeeCounter() {
  const [count, setCount] = useState(1337);
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <span className="text-4xl select-none">☕</span>
      <motion.div
        key={count}
        initial={{ scale: 1.3, color: '#3b82f6' }}
        animate={{ scale: 1, color: '#ffffff' }}
        className="font-mono text-4xl font-bold tracking-tighter"
      >
        {count.toLocaleString()}
      </motion.div>
      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Coffees consumed</span>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="mt-1 px-4 py-1.5 rounded-lg glass border border-white/10 text-xs font-mono text-white/60 hover:text-primary hover:border-primary/30 transition-all duration-200 active:scale-95"
      >
        + One more
      </button>
    </div>
  );
}

function QuoteWidget() {
  const [idx, setIdx] = useState(0);
  const q = QUOTES[idx];
  return (
    <div className="flex flex-col justify-between h-full gap-4">
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Random Quote</span>
      <div>
        <p className="text-sm text-white/70 leading-relaxed italic">"{q.text}"</p>
        <p className="text-xs font-mono text-white/30 mt-2">— {q.author}</p>
      </div>
      <button
        onClick={() => setIdx((i) => (i + 1) % QUOTES.length)}
        className="self-start text-xs font-mono text-white/30 hover:text-primary transition-colors"
      >
        shuffle →
      </button>
    </div>
  );
}

function FocusWidget() {
  return (
    <div className="flex flex-col justify-between h-full gap-3">
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Currently Building</span>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-mono text-green-400">Active</span>
        </div>
        <p className="text-sm text-white/80 leading-relaxed">{CURRENTLY_BUILDING}</p>
      </div>
      <div className="pt-2 border-t border-white/5">
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Focus Areas</span>
        <div className="flex flex-wrap gap-1.5">
          {CURRENT_FOCUS.split(' × ').map((f) => (
            <span key={f} className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShortcutsWidget() {
  const shortcuts = [
    { keys: ['⌘', 'K'], action: 'Command palette' },
    { keys: ['↑'], action: 'Back to top' },
    { keys: ['G', 'H'], action: 'Open GitHub' },
  ];
  return (
    <div className="flex flex-col gap-3 h-full">
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Keyboard Shortcuts</span>
      <div className="flex flex-col gap-2 flex-1 justify-center">
        {shortcuts.map(({ keys, action }) => (
          <div key={action} className="flex items-center justify-between">
            <span className="text-xs text-white/50">{action}</span>
            <div className="flex items-center gap-1">
              {keys.map((k) => (
                <kbd key={k} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-white/5">
        <span className="text-[10px] font-mono text-white/20">Try pressing ⌘K</span>
      </div>
    </div>
  );
}

export function FunSection() {
  return (
    <section id="fun" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">More</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">The Dashboard</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Real-time widgets. The stuff that doesn't fit in a resume.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { widget: <Clock />, label: 'Local Time', span: 'lg:col-span-1' },
            { widget: <CoffeeCounter />, label: 'Coffee', span: 'lg:col-span-1' },
            { widget: <QuoteWidget />, label: 'Quote', span: 'lg:col-span-2' },
            { widget: <FocusWidget />, label: 'Focus', span: 'lg:col-span-2' },
            { widget: <ShortcutsWidget />, label: 'Shortcuts', span: 'lg:col-span-2' },
          ].map(({ widget, label, span }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`glass-card rounded-2xl p-6 min-h-[180px] hover:scale-[1.01] transition-transform duration-300 ${span}`}
            >
              {widget}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
