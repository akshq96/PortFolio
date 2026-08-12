export function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm font-mono">
            &copy; {new Date().getFullYear()} Akshit Raj.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">Built with <span className="text-red-500 animate-pulse">❤️</span> & Code</span>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
