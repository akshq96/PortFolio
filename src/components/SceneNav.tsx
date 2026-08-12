import { motion } from 'framer-motion';
import { useScene } from './SceneRouter';

interface SceneNavProps {
  scenes: Array<'intro' | 'craft' | 'work' | 'process' | 'connect'>;
}

export function SceneNav({ scenes }: SceneNavProps) {
  const { activeScene, setActiveScene } = useScene();

  return (
    <motion.div 
      className="fixed top-8 right-8 z-[9000] flex gap-3 items-center opacity-30 hover:opacity-100 transition-opacity duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ delay: 2, duration: 1 }}
    >
      {scenes.map((scene, index) => {
        const isActive = activeScene === scene;
        return (
          <button
            key={scene}
            onClick={() => setActiveScene(scene)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isActive ? 'bg-primary scale-125' : 'bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to ${scene} scene`}
            title={scene.charAt(0).toUpperCase() + scene.slice(1)}
          />
        );
      })}
    </motion.div>
  );
}
