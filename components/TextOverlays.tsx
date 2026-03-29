'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { productData } from '@/data/product';

export default function TextOverlays() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 h-[1400vh]">
            {productData.storySequence.map((section) => {
                const opacity = useTransform(
                    scrollYProgress,
                    [section.scrollStart, section.scrollPeak, section.scrollEnd],
                    [0, 1, 0]
                );

                return (
                    <motion.div
                        key={section.id}
                        style={{ opacity }}
                        className="fixed inset-0 flex items-center justify-center text-center px-4"
                    >
                        <div className="max-w-4xl">
                            {/* Desktop heading */}
                            <h2 className="hidden md:block text-7xl lg:text-9xl font-calligraphy font-bold uppercase text-white drop-shadow-2xl tracking-wider">
                                {section.title}
                            </h2>

                            {/* Mobile heading - smaller to not overwhelm product */}
                            <h2 className="md:hidden text-5xl font-calligraphy font-bold uppercase text-white drop-shadow-2xl tracking-wider">
                                {section.title}
                            </h2>

                            {/* Subtitle */}
                            <p className="text-xl md:text-4xl font-body text-luxeGold mt-4 drop-shadow-xl">
                                {section.subtitle}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}