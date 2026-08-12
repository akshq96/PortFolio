import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneNav } from './SceneNav';
import { Intro } from '@/scenes/Intro';
import { Craft } from '@/scenes/Craft';
import { Work } from '@/scenes/Work';
import { Process } from '@/scenes/Process';
import { Connect } from '@/scenes/Connect';
import { Footer } from '@/components/layout/Footer';

type SceneName = 'intro' | 'craft' | 'work' | 'process' | 'connect';

interface SceneContextType {
  activeScene: SceneName;
  setActiveScene: (scene: SceneName) => void;
  prevScene: SceneName | null;
  craftFilter: string | null;
  setCraftFilter: (filter: string | null) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) throw new Error('useScene must be used within SceneRouter');
  return context;
}

const SCENE_ORDER: SceneName[] = ['intro', 'craft', 'work', 'process', 'connect'];

export function SceneRouter() {
  const [activeScene, setActiveScene] = useState<SceneName>('intro');
  const [prevScene, setPrevScene] = useState<SceneName | null>(null);
  const [craftFilter, setCraftFilter] = useState<string | null>(null);

  const handleSetScene = (scene: SceneName) => {
    if (scene !== activeScene) {
      setPrevScene(activeScene);
      setActiveScene(scene);
    }
  };

  const getTransition = (): any => {
    if (!prevScene) return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
    
    const prevIdx = SCENE_ORDER.indexOf(prevScene);
    const currIdx = SCENE_ORDER.indexOf(activeScene);
    const isForward = currIdx > prevIdx;

    // Scene 1->2: Content accelerates upward and collapses, new scene emerges from center
    if ((prevScene === 'intro' && activeScene === 'craft') || (prevScene === 'craft' && activeScene === 'intro')) {
      return {
        initial: { y: isForward ? '100%' : '-100%', opacity: 0, scale: isForward ? 0.9 : 1.1 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: isForward ? '-100%' : '100%', opacity: 0, scale: isForward ? 1.1 : 0.9 },
        transition: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1.2 }
      };
    }
    
    // Scene 2->3: Horizontal slide with parallax
    if ((prevScene === 'craft' && activeScene === 'work') || (prevScene === 'work' && activeScene === 'craft')) {
      return {
        initial: { x: isForward ? '100%' : '-100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: isForward ? '-50%' : '50%', opacity: 0 },
        transition: { type: 'spring' as const, stiffness: 250, damping: 30 }
      };
    }

    // Scene 3->4: Zoom out (content contracts), new scene expands
    if ((prevScene === 'work' && activeScene === 'process') || (prevScene === 'process' && activeScene === 'work')) {
      return {
        initial: { scale: isForward ? 1.2 : 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: isForward ? 0.8 : 1.2, opacity: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
      };
    }

    // Scene 4->5: Fade through black (default for others as well)
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.8, ease: 'easeInOut' }
    };
  };

  const currentTransition = getTransition();

  return (
    <SceneContext.Provider value={{ activeScene, setActiveScene: handleSetScene, prevScene, craftFilter, setCraftFilter }}>
      <SceneNav scenes={SCENE_ORDER} />
      
      <div className="relative w-full h-[100dvh] overflow-hidden">
        <AnimatePresence mode="wait">
          {activeScene === 'intro' && (
            <motion.div key="intro" className="absolute inset-0 w-full h-full" {...currentTransition}>
              <Intro />
            </motion.div>
          )}
          {activeScene === 'craft' && (
            <motion.div key="craft" className="absolute inset-0 w-full h-full overflow-y-auto" {...currentTransition}>
              <Craft />
            </motion.div>
          )}
          {activeScene === 'work' && (
            <motion.div key="work" className="absolute inset-0 w-full h-full overflow-y-auto" {...currentTransition}>
              <Work />
            </motion.div>
          )}
          {activeScene === 'process' && (
            <motion.div key="process" className="absolute inset-0 w-full h-full overflow-hidden" {...currentTransition}>
              <Process />
            </motion.div>
          )}
          {activeScene === 'connect' && (
            <motion.div key="connect" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col" {...currentTransition}>
              <Connect />
              <div className="mt-auto">
                <Footer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneContext.Provider>
  );
}
