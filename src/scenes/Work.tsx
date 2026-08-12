import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useScene } from '@/components/SceneRouter';

const PROJECTS = [
  {
    id: '01',
    name: 'NeuroFlow',
    category: 'AI Workflow Engine',
    year: '2024',
    filter: 'ai',
    color: '#3b82f6',
    challenge: 'Enterprises struggle to orchestrate complex AI workflows across multiple models and data sources without building fragile custom infrastructure.',
    description: 'A visual workflow engine that connects LLMs to enterprise data sources. Built with React Flow on the frontend and a scalable Rust execution engine on the backend. It allows non-technical users to build autonomous agents by connecting capability nodes.',
    tech: 'React • TypeScript • Rust • PostgreSQL • OpenAI API',
    metric: '10k+ requests/day',
    codeSnippet: `async function executeNode(node: AgentNode, ctx: WorkflowContext) {
  const result = await llm.generate({
    model: node.config.model,
    prompt: compilePrompt(node.template, ctx),
    tools: node.tools.map(resolveTool)
  });
  
  return processResult(result, node.outputSchema);
}`,
  },
  {
    id: '02',
    name: 'ChainVault',
    category: 'Solana Asset Manager',
    year: '2023',
    filter: 'web3',
    color: '#7c3aed',
    challenge: 'Managing institutional crypto assets on Solana required insecure workarounds or highly technical multisig setups that lacked policy controls.',
    description: 'An institutional-grade asset management protocol on Solana. It implements advanced program-derived address (PDA) architecture to enable policy-based spending limits and time-locked transactions without sacrificing self-custody.',
    tech: 'Rust • Anchor • Solana Web3.js • React',
    metric: '$50M+ total value locked',
    codeSnippet: `#[account]
pub struct Vault {
    pub authority: Pubkey,
    pub token_account: Pubkey,
    pub spend_limit: u64,
    pub time_lock_bump: i64,
    pub nonce: u8,
}

pub fn execute_transfer(ctx: Context<ExecuteTransfer>, amount: u64) -> Result<()> {
    require!(amount <= ctx.accounts.vault.spend_limit, ErrorCode::ExceedsLimit);
    // ... transfer logic
}`,
  },
  {
    id: '03',
    name: 'HackBot',
    category: 'Real-time Code Assistant',
    year: '2023',
    filter: 'ai',
    color: '#06b6d4',
    challenge: 'Existing code assistants were too slow for real-time pair programming and lacked context of the entire monorepo.',
    description: 'A low-latency code assistant that indexes your local workspace and provides contextual suggestions. It uses a custom AST parser to build a dependency graph of the codebase, ensuring the LLM always has the right files in context.',
    tech: 'TypeScript • Node.js • Tree-sitter • Redis',
    metric: '< 400ms response time',
    codeSnippet: `export class CodeIndexer {
  async indexFile(filePath: string): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');
    const ast = this.parser.parse(content);
    
    const exports = this.extractExports(ast);
    const imports = this.extractImports(ast);
    
    await this.vectorStore.upsert({
      id: filePath,
      embeddings: await this.embedder.embed(content),
      metadata: { exports, imports }
    });
  }
}`,
  },
  {
    id: '04',
    name: 'SolTrace',
    category: 'Blockchain Explorer',
    year: '2023',
    filter: 'web3',
    color: '#10b981',
    challenge: 'Analyzing raw Solana transaction data is notoriously difficult due to complex inner instructions and missing ABI standards.',
    description: 'A human-readable explorer for Solana transactions. It decodes complex DeFi swaps and NFT trades into clear visual timelines. The backend ingests the firehose RPC stream and maps raw instruction data to known program IDLs in real-time.',
    tech: 'Next.js • Tailwind • Geyser Plugin • ClickHouse',
    metric: '3k+ TPS indexed in real-time',
    codeSnippet: `function parseInstruction(ix: CompiledInstruction, idl: Idl) {
  const discriminator = ix.data.slice(0, 8);
  const ixDef = idl.instructions.find(i => 
    Buffer.from(sighash(i.name)).equals(discriminator)
  );
  
  if (!ixDef) return { type: 'unknown', raw: ix.data };
  
  return {
    type: 'known',
    name: ixDef.name,
    args: decodeArgs(ix.data.slice(8), ixDef.args)
  };
}`,
  }
];

function ArchDiagram({ color }: { color: string }) {
  return (
    <svg width="100%" height="200" viewBox="0 0 400 200" className="opacity-80">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={color} opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <rect x="50" y="50" width="80" height="100" rx="4" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <rect x="180" y="30" width="180" height="60" rx="4" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <rect x="180" y="110" width="180" height="60" rx="4" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      
      <path d="M130 80 L180 60" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      <path d="M130 120 L180 140" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      
      <circle cx="155" cy="70" r="3" fill={color} />
      <circle cx="155" cy="130" r="3" fill={color} />
    </svg>
  );
}

export function Work() {
  const { craftFilter, setCraftFilter } = useScene();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const selectedProject = PROJECTS.find(p => p.id === activeProject);
  const displayedProjects = craftFilter ? PROJECTS.filter(p => p.filter === craftFilter) : PROJECTS;

  return (
    <div className="w-full min-h-full">
      <AnimatePresence mode="wait">
        {!activeProject ? (
          <motion.div 
            key="list"
            className="w-full min-h-full py-32 px-8 md:px-24 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-16 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">Selected Work</span>
              {craftFilter && (
                <button 
                  onClick={() => setCraftFilter(null)}
                  className="text-xs uppercase tracking-widest font-mono text-white/50 hover:text-white transition-colors"
                >
                  Clear Filter ✕
                </button>
              )}
            </div>
            
            <div className="flex flex-col border-t border-white/5">
              {displayedProjects.map((project, i) => {
                const isHovered = hoveredProject === project.id;
                return (
                  <motion.div
                    key={project.id}
                    className="group relative flex flex-col md:flex-row md:items-center py-8 md:py-12 border-b border-white/5 cursor-pointer"
                    onClick={() => setActiveProject(project.id)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    {/* Left accent line on hover */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px]"
                      style={{ backgroundColor: project.color }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    <div className="w-16 text-muted-foreground/50 font-mono text-sm mb-4 md:mb-0">
                      {project.id}
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <h3 className="text-3xl md:text-5xl font-light text-white/80 group-hover:text-white transition-colors">
                        {project.name}
                      </h3>

                      {/* Metadata slot: category/year swaps to metric on hover */}
                      <div className="relative flex items-center h-6 min-w-[240px] md:text-right overflow-hidden">
                        {/* Default: category + year */}
                        <motion.div
                          className="absolute inset-0 flex items-center gap-8 text-sm text-muted-foreground font-mono md:justify-end"
                          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -12 : 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                        >
                          <span>{project.category}</span>
                          <span className="text-white/20">{project.year}</span>
                        </motion.div>

                        {/* Hover: metric */}
                        <motion.div
                          className="absolute inset-0 flex items-center md:justify-end"
                          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                        >
                          <span
                            className="text-sm font-mono"
                            style={{ color: project.color }}
                          >
                            {project.metric}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            className="w-full min-h-[100dvh] flex flex-col md:flex-row relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background wash */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none transition-colors duration-1000"
              style={{ background: `radial-gradient(circle at top left, ${selectedProject?.color} 0%, transparent 60%)` }}
            />

            <button 
              className="absolute top-8 left-8 z-50 text-sm font-mono text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
              onClick={() => setActiveProject(null)}
            >
              <span>←</span> Work
            </button>

            {/* Left Panel */}
            <div className="w-full md:w-[40%] px-8 pt-32 pb-16 md:p-24 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
              <div>
                <motion.h1 
                  className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6"
                  style={{ color: selectedProject?.color }}
                  layoutId={`title-${selectedProject?.id}`}
                >
                  {selectedProject?.name}
                </motion.h1>
                <p className="text-xl text-white/80 font-light mb-12">
                  {selectedProject?.category}
                </p>

                <div className="space-y-6">
                  <div>
                    <span className="block text-xs uppercase tracking-widest font-mono text-muted-foreground mb-2">Challenge</span>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {selectedProject?.challenge}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5">
                <span className="block text-xs uppercase tracking-widest font-mono text-muted-foreground mb-2">Stack</span>
                <p className="text-sm text-white/60 font-mono">
                  {selectedProject?.tech}
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-[60%] px-8 py-16 md:p-24 overflow-y-auto">
              <div className="max-w-2xl space-y-16">
                <div>
                  <span className="block text-xs uppercase tracking-widest font-mono text-muted-foreground mb-6" style={{ color: selectedProject?.color }}>Architecture</span>
                  <p className="text-lg text-white/80 leading-relaxed mb-8">
                    {selectedProject?.description}
                  </p>
                  <div className="w-full border border-white/5 bg-black/20 rounded-lg overflow-hidden">
                    <ArchDiagram color={selectedProject?.color || '#ffffff'} />
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-widest font-mono text-muted-foreground mb-6" style={{ color: selectedProject?.color }}>Implementation</span>
                  <div className="border border-white/5 rounded-lg overflow-hidden bg-[#0a0a0c]">
                    <div className="border-b border-white/5 px-4 py-2 flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <pre className="p-6 text-sm font-mono text-white/70 overflow-x-auto">
                      <code>{selectedProject?.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <span className="block text-xs uppercase tracking-widest font-mono text-muted-foreground mb-2">Outcome</span>
                  <p className="text-2xl font-light text-white">
                    {selectedProject?.metric}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
