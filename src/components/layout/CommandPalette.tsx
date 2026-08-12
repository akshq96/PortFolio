import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Github, User, Briefcase, Mail, Zap, X } from 'lucide-react';
import { Command } from 'cmdk';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === '/' && !open) {
        // Prevent default only if not in an input
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9998]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[9999]"
          >
            <div className="bg-card/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden shadow-primary/20">
              <Command className="w-full bg-transparent">
                <div className="flex items-center border-b border-white/10 px-3 py-2">
                  <Terminal className="w-5 h-5 text-muted-foreground mr-2" />
                  <Command.Input 
                    placeholder="Type a command or search..." 
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground py-2 font-mono"
                  />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground border border-white/10 px-2 py-1 rounded">
                    ESC
                  </div>
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto p-2">
                  <Command.Empty className="p-4 text-center text-sm text-muted-foreground">
                    No results found.
                  </Command.Empty>
                  
                  <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground px-2 py-1">
                    <Command.Item 
                      onSelect={() => runCommand(() => scrollTo('hero'))}
                      className="flex items-center px-2 py-2 mt-1 rounded-md cursor-pointer aria-selected:bg-primary/20 aria-selected:text-primary text-white text-sm transition-colors"
                    >
                      <Terminal className="w-4 h-4 mr-2" /> Home
                    </Command.Item>
                    <Command.Item 
                      onSelect={() => runCommand(() => scrollTo('about'))}
                      className="flex items-center px-2 py-2 mt-1 rounded-md cursor-pointer aria-selected:bg-primary/20 aria-selected:text-primary text-white text-sm transition-colors"
                    >
                      <User className="w-4 h-4 mr-2" /> About Me
                    </Command.Item>
                    <Command.Item 
                      onSelect={() => runCommand(() => scrollTo('skills'))}
                      className="flex items-center px-2 py-2 mt-1 rounded-md cursor-pointer aria-selected:bg-primary/20 aria-selected:text-primary text-white text-sm transition-colors"
                    >
                      <Zap className="w-4 h-4 mr-2" /> Skills
                    </Command.Item>
                    <Command.Item 
                      onSelect={() => runCommand(() => scrollTo('projects'))}
                      className="flex items-center px-2 py-2 mt-1 rounded-md cursor-pointer aria-selected:bg-primary/20 aria-selected:text-primary text-white text-sm transition-colors"
                    >
                      <Briefcase className="w-4 h-4 mr-2" /> Projects
                    </Command.Item>
                    <Command.Item 
                      onSelect={() => runCommand(() => scrollTo('contact'))}
                      className="flex items-center px-2 py-2 mt-1 rounded-md cursor-pointer aria-selected:bg-primary/20 aria-selected:text-primary text-white text-sm transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2" /> Contact
                    </Command.Item>
                  </Command.Group>
                  
                  <Command.Group heading="Links" className="text-xs font-medium text-muted-foreground px-2 py-1 mt-2">
                    <Command.Item 
                      onSelect={() => runCommand(() => window.open('https://github.com', '_blank'))}
                      className="flex items-center px-2 py-2 mt-1 rounded-md cursor-pointer aria-selected:bg-white/10 text-white text-sm transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" /> GitHub
                    </Command.Item>
                    <Command.Item 
                      onSelect={() => runCommand(() => window.open('https://linkedin.com', '_blank'))}
                      className="flex items-center px-2 py-2 mt-1 rounded-md cursor-pointer aria-selected:bg-white/10 text-white text-sm transition-colors"
                    >
                      <Briefcase className="w-4 h-4 mr-2" /> LinkedIn
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
