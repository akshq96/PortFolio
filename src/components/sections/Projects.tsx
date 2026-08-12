import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ChevronRight } from 'lucide-react';

const FILTERS = ['All', 'AI', 'Blockchain', 'Web', 'Hackathon'];

interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string[];
  color: string;
  year: string;
  role: string;
  timeline: string;
  tech: string[];
  challenge: string;
  solution: string;
  features: string[];
  metric: string;
  github: string;
  demo: string;
  codeSnippet: string;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    name: 'NeuroFlow',
    tagline: 'Visual AI workflow engine for enterprise orchestration',
    category: ['AI'],
    color: '#3b82f6',
    year: '2024',
    role: 'Lead Engineer',
    timeline: '4 months',
    tech: ['React', 'TypeScript', 'Rust', 'PostgreSQL', 'OpenAI'],
    challenge: 'Enterprises struggled to orchestrate complex AI workflows without fragile custom infrastructure.',
    solution: 'Visual drag-and-drop engine connecting LLMs to enterprise data. Rust execution backend handles concurrency without GC pauses.',
    features: ['Drag-and-drop workflow builder', 'Multi-model support', 'Real-time execution logs', 'Policy-based access controls'],
    metric: '10k+ requests/day processed',
    github: 'https://github.com/akshitraj/neuroflow',
    demo: '#',
    codeSnippet: `async fn execute_node(node: &AgentNode, ctx: &WorkflowCtx) -> Result<Output> {
  let result = llm_client.generate(GenerateRequest {
    model: &node.config.model,
    prompt: compile_prompt(&node.template, ctx),
    tools: node.tools.iter().map(resolve_tool).collect(),
  }).await?;
  process_result(result, &node.output_schema)
}`,
  },
  {
    id: '02',
    name: 'ChainVault',
    tagline: 'Institutional-grade asset management protocol on Solana',
    category: ['Blockchain', 'Hackathon'],
    color: '#7c3aed',
    year: '2023',
    role: 'Sole Developer',
    timeline: '48h hackathon + 6w production',
    tech: ['Rust', 'Anchor', 'Solana Web3.js', 'React'],
    challenge: 'Institutional crypto custody on Solana required insecure workarounds or complex multisig with no policy controls.',
    solution: 'PDA-based vault architecture with on-chain policy enforcement — spend limits, time locks, multi-approval flows.',
    features: ['Policy-based spend limits', 'Time-locked transactions', 'Multi-authority approval', 'Self-custody guaranteed'],
    metric: '$50M+ total value locked',
    github: 'https://github.com/akshitraj/chainvault',
    demo: '#',
    codeSnippet: `pub fn execute_transfer(ctx: Context<ExecuteTransfer>, amount: u64) -> Result<()> {
    let vault = &ctx.accounts.vault;
    require!(amount <= vault.spend_limit, ErrorCode::ExceedsLimit);
    require!(clock::unix_timestamp() >= vault.unlock_at, ErrorCode::TimeLocked);
    token::transfer(ctx.accounts.into_transfer_ctx(), amount)
}`,
  },
  {
    id: '03',
    name: 'HackBot',
    tagline: 'Sub-400ms real-time code assistant with monorepo context',
    category: ['AI', 'Hackathon'],
    color: '#06b6d4',
    year: '2023',
    role: 'Sole Developer',
    timeline: '48h hackathon',
    tech: ['TypeScript', 'Node.js', 'Tree-sitter', 'Redis', 'OpenAI'],
    challenge: 'Existing code assistants were too slow for real-time pairing and lacked full monorepo context.',
    solution: 'Custom AST parser builds a live dependency graph. Tree-sitter parses without a language server. Redis caches embeddings.',
    features: ['< 400ms response time', 'Full workspace indexing', 'Dependency graph context', 'Streaming completions'],
    metric: '< 400ms average response time',
    github: 'https://github.com/akshitraj/hackbot',
    demo: '#',
    codeSnippet: `export class CodeIndexer {
  async indexFile(path: string) {
    const tree = this.parser.parse(await fs.readFile(path, 'utf-8'));
    await this.store.upsert({
      id: path,
      vector: await this.embed(tree.rootNode.text),
      meta: { exports: extractExports(tree), imports: extractImports(tree) }
    });
  }
}`,
  },
  {
    id: '04',
    name: 'SolTrace',
    tagline: 'Human-readable Solana explorer decoding 3k+ TPS in real-time',
    category: ['Blockchain', 'Web'],
    color: '#10b981',
    year: '2023',
    role: 'Lead Engineer',
    timeline: '3 months',
    tech: ['Next.js', 'ClickHouse', 'Geyser Plugin', 'TypeScript'],
    challenge: 'Raw Solana transaction data is notoriously unreadable — complex inner instructions, no universal ABI standard.',
    solution: 'Geyser plugin ingests the firehose. IDL-based decoder maps instructions to program interfaces. ClickHouse handles 3k+ TPS analytics.',
    features: ['Real-time TPS indexing', 'IDL-based instruction decoder', 'DeFi swap visualization', 'Historical analytics'],
    metric: '3k+ TPS indexed in real-time',
    github: 'https://github.com/akshitraj/soltrace',
    demo: '#',
    codeSnippet: `function parseInstruction(ix: CompiledInstruction, idl: Idl) {
  const disc = ix.data.slice(0, 8);
  const def = idl.instructions.find(i =>
    Buffer.from(sighash(i.name)).equals(disc)
  );
  if (!def) return { type: 'unknown', raw: ix.data };
  return { type: 'known', name: def.name, args: decodeArgs(ix.data.slice(8), def.args) };
}`,
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
      style={{
        boxShadow: `0 0 0 1px ${project.color}11`,
      }}
      whileHover={{ boxShadow: `0 0 40px ${project.color}22, 0 0 0 1px ${project.color}33` }}
    >
      {/* Top accent bar */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-white/30">{project.id} · {project.year}</span>
            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-white transition-colors">
              {project.name}
            </h3>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 mt-1" />
        </div>

        <p className="text-sm text-white/50 mb-4 leading-relaxed">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.category.map((cat) => (
            <span key={cat} className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${project.color}40`, color: project.color, background: `${project.color}11` }}>
              {cat}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded bg-white/5">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: project.color }}>
            {project.metric}
          </span>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
            {project.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl"
        style={{ borderColor: `${project.color}33` }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}44, transparent)` }} />

        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {project.category.map((cat) => (
                  <span key={cat} className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ background: `${project.color}22`, color: project.color }}>
                    {cat}
                  </span>
                ))}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: project.color }}>
                {project.name}
              </h2>
              <p className="text-white/60 mt-2 text-lg">{project.tagline}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl glass border border-white/10 text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[{ label: 'Role', val: project.role }, { label: 'Timeline', val: project.timeline }, { label: 'Outcome', val: project.metric }].map(({ label, val }) => (
              <div key={label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-white font-medium">{val}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: project.color }}>Challenge</h4>
              <p className="text-white/60 text-sm leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: project.color }}>Solution</h4>
              <p className="text-white/60 text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: project.color }}>Key Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: project.color }}>Implementation</h4>
            <div className="rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0c]">
              <div className="border-b border-white/5 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[10px] font-mono text-white/20 ml-2">{project.name.toLowerCase()}.{project.tech[0] === 'Rust' ? 'rs' : 'ts'}</span>
              </div>
              <pre className="p-5 text-sm font-mono text-white/70 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={project.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/30 transition-all duration-200">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white font-medium transition-all duration-200 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}99)` }}>
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Mission Log</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Each project started as a problem worth solving. Click to open the full case study.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                activeFilter === f
                  ? 'border-primary/50 text-primary bg-primary/10'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
