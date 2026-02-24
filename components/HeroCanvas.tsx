'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // CRITICAL FIX: Fade out canvas at the end to prevent double machine
    const canvasOpacity = useTransform(
        scrollYProgress,
        [0, 0.85, 0.95, 1],
        [1, 1, 0, 0]
    );

    const TOTAL_FRAMES = 180;

    // Preload all frames with correct naming: ezgif-frame-001.jpg to ezgif-frame-249.jpg
    useEffect(() => {
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `/images/Bakhoor/ezgif-frame-${frameNum}.jpg`;
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    // Render frames based on scroll with high-DPI support
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            const progress = scrollYProgress.get();
            const frameIndex = Math.min(
                Math.floor(progress * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            );

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

            // Object-fit: contain logic - centers the image and prevents cropping
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
        render(); // Initial render

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <div ref={containerRef} className="h-[1000vh] relative">
            <motion.canvas
                ref={canvasRef}
                style={{ opacity: canvasOpacity }}
                className="fixed inset-0 w-screen h-screen bg-black brightness-125"
            />
        </div>
    );
}