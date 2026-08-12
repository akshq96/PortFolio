import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroScene } from '@/components/sections/HeroScene';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/akshitraj',
    descriptor: 'Open source work & side projects',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/akshitraj',
    descriptor: 'Professional background',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/akshitraj',
    descriptor: 'Thoughts on engineering & building',
  },
];

function SocialLink({ label, href, descriptor }: { label: string; href: string; descriptor: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-fit flex flex-col gap-0.5 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2 text-lg text-muted-foreground font-mono group-hover:text-white transition-colors duration-200">
        {label}
        <motion.span
          animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ↗
        </motion.span>
      </div>
      <div
        style={{
          maxHeight: hovered ? '24px' : '0px',
          opacity: hovered ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.25s ease, opacity 0.2s ease',
        }}
      >
        <span className="text-xs text-muted-foreground/60 font-mono">{descriptor}</span>
      </div>
    </a>
  );
}

export function Connect() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('hello@akshitraj.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full flex flex-col md:flex-row relative">
      {/* Left Content Area */}
      <div className="flex-1 px-8 md:px-24 pt-32 pb-16 flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-24">
            Let's build something worth building.
          </h2>

          <div className="flex flex-col gap-12">
            {/* Email with overlay copied state */}
            <div className="relative">
              <a
                href="mailto:hello@akshitraj.com"
                onClick={handleCopyEmail}
                className="text-2xl md:text-4xl font-mono text-white/80 hover:text-white transition-colors relative inline-block"
              >
                hello@akshitraj.com
              </a>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    className="absolute inset-0 flex items-center"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-2xl md:text-4xl font-mono text-primary">
                      Copied to clipboard.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-6">
              {SOCIALS.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>

            <div className="pt-12">
              <p className="text-sm text-muted-foreground">
                Resume available on request.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Ambient Area */}
      <div className="hidden md:block flex-1 relative overflow-hidden h-[100dvh] border-l border-white/5 bg-black/20">
        <div className="absolute inset-0 transform scale-150 origin-center opacity-60 mix-blend-screen pointer-events-none filter blur-xl">
          <HeroScene />
        </div>
      </div>
    </div>
  );
}
