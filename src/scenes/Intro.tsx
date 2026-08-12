import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from '@/components/sections/HeroScene';

export function Intro() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowQuestion(true), 500);
    const t2 = setTimeout(() => setShowAnswer(true), 3500);
    const t3 = setTimeout(() => setShowName(true), 5500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const questionText = "What if software could think?";

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-8 md:px-24">
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <HeroScene />
      </div>
      
      <div className="z-10 max-w-4xl pt-20">
        <div className="h-12 md:h-16 mb-6">
          {showQuestion && (
            <motion.h1 
              className="text-2xl md:text-4xl font-light text-muted-foreground tracking-wide"
              initial={{ opacity: 1 }}
            >
              {questionText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.1 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          )}
        </div>

        <div className="h-12 md:h-16 mb-24">
          {showAnswer && (
            <motion.h2 
              className="text-2xl md:text-4xl font-normal text-white"
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              That's what I've been building.
            </motion.h2>
          )}
        </div>

        {showName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative"
          >
            <h3 className="text-6xl md:text-8xl font-semibold tracking-tighter text-white mb-6 ml-[-0.05em]">
              Akshit Raj
            </h3>
            <div className="flex gap-6 text-sm md:text-base text-muted-foreground font-mono uppercase tracking-widest">
              <span>Software Engineer</span>
              <span className="opacity-50">•</span>
              <span>India</span>
            </div>
            
            <motion.div 
              className="absolute -bottom-12 md:-bottom-24 left-0 h-px bg-gradient-to-r from-primary/50 via-secondary/20 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "100vw" }}
              transition={{ duration: 3, delay: 1, ease: "circOut" }}
            />
          </motion.div>
        )}
      </div>

      {showName && (
        <motion.div 
          className="absolute bottom-12 left-8 md:left-24 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Available for work</span>
        </motion.div>
      )}
    </div>
  );
}
