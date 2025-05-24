// // src/components/PageWrapper.jsx
// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { usePathname } from 'next/navigation';

// const variants = {
//   initial: { y: '100%', opacity: 0 },
//   animate: { y: 0, opacity: 1 },
// //   exit: { y: '-100%', opacity: 0 },
// };

// export default function PageWrapper({ children }) {
//   const pathname = usePathname();

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={pathname}
//         initial="initial"
//         animate="animate"
//         // exit="exit"
//         variants={variants}
//         transition={{ duration: 1, ease:"easeOut" }}
//         className="min-h-screen"
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }



// src/components/PageWrapper.jsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
//   exit: { y: '-100%', opacity: 0 },
};

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    // Don't animate the first time (initial load)
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setShouldAnimate(true);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={shouldAnimate ? 'initial' : false}
        animate={shouldAnimate ? 'animate' : false}
        // exit={shouldAnimate ? 'exit' : false}
        variants={variants}
        transition={{ duration: 1.3, ease: "easeIn", 
            // type: 'spring',
    // stiffness: 200,
    // damping: 10,
    // bounce: 1, // bounc }}
        }}
        
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
