'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { productData } from '@/data/product';

export default function FinalCTA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end end'], // Starts as section comes into view
    });

    const START_FRAME = 181;
    const END_FRAME = 249;
    const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

    // Fade in text as scroll progresses
    const textOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);

    // Preload frames 181-249
    useEffect(() => {
        const images: HTMLImageElement[] = [];

        for (let i = START_FRAME; i <= END_FRAME; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `/images/Bakhoor/ezgif-frame-${frameNum}.jpg`;
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    // Render frames
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            const progress = scrollYProgress.get();
            // Map 0-1 progress to 0-(totalFrames-1)
            const frameIndex = Math.min(
                Math.floor(progress * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            );

            // Safety check
            if (frameIndex < 0 || !imagesRef.current[frameIndex]) return;

            const img = imagesRef.current[frameIndex];
            if (!img || !img.complete) return;

            // High-DPI rendering
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, width, height);

            // Object-fit: contain logic - centers the image
            const imgRatio = img.width / img.height;
            const canvasRatio = width / height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawWidth = width;
                drawHeight = width / imgRatio;
                offsetX = 0;
                offsetY = (height - drawHeight) / 2;
            } else {
                drawHeight = height;
                drawWidth = height * imgRatio;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const unsubscribe = scrollYProgress.on('change', render);
        // Initial render attempt (likely won't be ready immediately, but good practice)
        render();

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative z-50 h-[120vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-end pb-0">
                {/* Canvas Background */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Overlay Gradient for Text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

                {/* Heading at very bottom */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="relative z-20 text-center px-4"
                >
                    <h2 className="text-5xl md:text-8xl font-calligraphy font-bold uppercase text-luxeGold mb-8 drop-shadow-lg">
                        {productData.finalTagline}
                    </h2>

                    {/* White Buy Now Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 md:px-12 md:py-6 bg-white text-black text-xl md:text-2xl font-bold rounded-full hover:bg-luxeGold hover:text-black transition-colors shadow-2xl"
                    >
                        {productData.ctaText}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
