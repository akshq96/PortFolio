import { motion } from 'framer-motion';
import { useScene } from '@/components/SceneRouter';

interface BandProps {
  title: string;
  points: string[];
  color: string;
  delay: number;
  filterId: string;
  diagram: React.ReactNode;
}

function Band({ title, points, color, delay, filterId, diagram }: BandProps) {
  const { setActiveScene, setCraftFilter } = useScene();

  const handleClick = () => {
    setCraftFilter(filterId);
    setActiveScene('work');
  };

  return (
    <motion.div 
      className="group relative flex flex-col md:flex-row w-full min-h-[30vh] border-b border-white/5 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleClick}
    >
      {/* Accent Line */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: color }}
        layoutId={`accent-${filterId}`}
      />
      
      {/* Hover Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-light text-white/90 group-hover:text-white transition-colors duration-300 tracking-tight">
          {title}
        </h2>
      </div>

      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5">
        <ul className="space-y-4 mb-8">
          {points.map((point, i) => (
            <motion.li 
              key={i}
              className="text-muted-foreground text-sm md:text-base flex items-start gap-3"
            >
              <span className="text-white/20 mt-1">―</span>
              {point}
            </motion.li>
          ))}
        </ul>
        <div className="w-full h-32 opacity-40 group-hover:opacity-100 transition-opacity duration-500 flex items-center">
          {diagram}
        </div>
      </div>
    </motion.div>
  );
}

function AIDiagram() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 100" className="stroke-[#3b82f6]">
      <motion.rect x="10" y="30" width="80" height="40" rx="4" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      <motion.rect x="160" y="10" width="80" height="30" rx="4" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      <motion.rect x="160" y="60" width="80" height="30" rx="4" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      <motion.rect x="310" y="30" width="80" height="40" rx="4" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      
      {/* Animated paths */}
      <motion.path 
        d="M90 50 C120 50, 130 25, 160 25" 
        fill="none" 
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.path 
        d="M90 50 C120 50, 130 75, 160 75" 
        fill="none" 
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
      <motion.path 
        d="M240 25 C270 25, 280 50, 310 50" 
        fill="none" 
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
      />
      <motion.path 
        d="M240 75 C270 75, 280 50, 310 50" 
        fill="none" 
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
      />
    </svg>
  );
}

function Web3Diagram() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 100" className="stroke-[#7c3aed]">
      <motion.polygon points="200,10 240,50 200,90 160,50" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      <motion.circle cx="80" cy="50" r="20" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      <motion.circle cx="320" cy="50" r="20" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      
      <motion.path 
        d="M100 50 L160 50" 
        fill="none" 
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ strokeDashoffset: 20 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.path 
        d="M240 50 L300 50" 
        fill="none" 
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ strokeDashoffset: 20 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function FullStackDiagram() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 100" className="stroke-[#06b6d4]">
      <motion.rect x="50" y="20" width="300" height="60" rx="8" fill="none" strokeWidth="1" strokeOpacity="0.5" />
      <motion.line x1="50" y1="40" x2="350" y2="40" strokeWidth="1" strokeOpacity="0.3" />
      
      <motion.rect x="70" y="55" width="60" height="15" rx="2" fill="none" strokeWidth="1" strokeOpacity="0.3" />
      <motion.rect x="140" y="55" width="100" height="15" rx="2" fill="none" strokeWidth="1" strokeOpacity="0.3" />
      <motion.rect x="250" y="55" width="80" height="15" rx="2" fill="none" strokeWidth="1" strokeOpacity="0.3" />
      
      <motion.circle cx="70" cy="30" r="3" fill="none" />
      <motion.circle cx="80" cy="30" r="3" fill="none" />
      <motion.circle cx="90" cy="30" r="3" fill="none" />

      <motion.rect 
        x="70" y="55" width="60" height="15" rx="2" fill="currentColor" fillOpacity="0.1" stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Craft() {
  return (
    <div className="w-full min-h-full flex flex-col pt-16 md:pt-0">
      <div className="px-8 md:px-16 py-12">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-widest font-mono text-muted-foreground"
        >
          Capabilities
        </motion.p>
      </div>

      <Band 
        title="Systems that think"
        points={[
          "Autonomous agents & workflow automation",
          "LLM integrations & retrieval pipelines",
          "Intelligent data processing engines"
        ]}
        color="#3b82f6"
        delay={0.1}
        filterId="ai"
        diagram={<AIDiagram />}
      />

      <Band 
        title="Contracts that execute"
        points={[
          "DeFi protocols & smart contract architecture",
          "Solana programs in Rust",
          "On-chain data systems & indexers"
        ]}
        color="#7c3aed"
        delay={0.2}
        filterId="web3"
        diagram={<Web3Diagram />}
      />

      <Band 
        title="Interfaces that work"
        points={[
          "React/Next.js applications at scale",
          "Production-grade APIs & middleware",
          "Performance-focused user experiences"
        ]}
        color="#06b6d4"
        delay={0.3}
        filterId="fullstack"
        diagram={<FullStackDiagram />}
      />
    </div>
  );
}
