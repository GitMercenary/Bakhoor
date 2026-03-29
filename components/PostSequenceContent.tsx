'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { productData } from '@/data/product';
import TravelingMachine from './TravelingMachine';

function TextSection({ section, index, scrollYProgress }: { section: any, index: number, scrollYProgress: any }) {
    const mapping = [
        [0, 0, 0.28, 0.35],            // 0: visible -> fades out 28-35%
        [0.25, 0.32, 0.62, 0.68],      // 1: fades in 25-32%, fades out 62-68%
        [0.58, 0.65, 1, 1]             // 2: fades in 58-65%, stays visible to end
    ];

    const opacity = useTransform(
        scrollYProgress,
        mapping[index],
        [index === 0 ? 1 : 0, 1, 1, 0]
    );

    return (
        <motion.section
            style={{ opacity }}
            className="sticky top-0 h-screen flex flex-col items-center justify-start px-8 pt-20 md:pt-32 pb-12 overflow-hidden"
        >
            {/* Header aligned at the top */}
            <div className="w-full relative z-[99] mb-8 md:mb-16">
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-calligraphy font-bold uppercase text-white leading-tight text-center tracking-wider drop-shadow-2xl">
                    {section.title}
                </h2>
            </div>

            {/* Paragraphs centered below the header */}
            <div className="max-w-4xl w-full flex flex-col items-center justify-start gap-6 md:gap-10 text-center relative z-[99]">
                {section.paragraphs.map((para: string, i: number) => (
                    <p key={i} className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light drop-shadow-lg px-2">
                        {para}
                    </p>
                ))}
            </div>
        </motion.section>
    );
}

export default function PostSequenceContent() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end end'],
    });

    return (
        // ✅ FIXED: Added h-[300vh] to create scroll container
        <div ref={containerRef} className="relative h-[300vh]">
            {/* 1. BACKGROUND LAYER (z-0) - Solid backgrounds stack here */}
            <div className="absolute inset-0 z-0">
                {productData.contentSections.map((section) => (
                    <div
                        key={`bg-${section.id}`}
                        style={{ backgroundColor: section.background }}
                        className="sticky top-0 w-full h-screen"
                    />
                ))}
            </div>

            {/* 2. TRAVELING MACHINE LAYER - Overlays background, underneath text.
                z-index is managed INSIDE the component so debug UI can break out to z-[999] */}
            <div className="absolute inset-0 pointer-events-none">
                <TravelingMachine scrollRef={containerRef} />
            </div>

            {/* 3. CONTENT LAYER (z-50) - Text sections with transparent background */}
            <div className="relative z-[50] pointer-events-none">
                {productData.contentSections.map((section, index) => (
                    <TextSection
                        key={`content-${section.id}`}
                        section={section}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
}