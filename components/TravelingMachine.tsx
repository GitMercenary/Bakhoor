'use client';

import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TravelingMachineProps {
    scrollRef: React.RefObject<HTMLElement>;
}

export default function TravelingMachine({ scrollRef }: TravelingMachineProps) {
    const [scrollPercent, setScrollPercent] = useState(0);

    // Debug state
    const [debugMode, setDebugMode] = useState(true); // Start enabled
    const [viewportWidth, setViewportWidth] = useState(0);
    const [xPixels, setXPixels] = useState(0);
    const [currentZone, setCurrentZone] = useState('BEFORE');
    const [visibleWidth, setVisibleWidth] = useState(0);
    const [currentOpacity, setCurrentOpacity] = useState(0);
    const [currentRotate, setCurrentRotate] = useState(0);
    const [currentScale, setCurrentScale] = useState(0);

    // CRITICAL FIX: Use layoutEffect to ensure ref is set before useScroll runs
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            setIsReady(true);
        }
    }, [scrollRef]);

    // FIXED: Track scroll ONLY when PostSequenceContent is entering/in view
    // offset: ['start end', 'end end'] means:
    // - 0% when container TOP reaches viewport BOTTOM (section enters view)
    // - 100% when container BOTTOM reaches viewport BOTTOM (section exits view)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start end', 'end end'],
    });

    // Viewport tracking
    useEffect(() => {
        const updateViewport = () => setViewportWidth(window.innerWidth);
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    // Keyboard toggle for debug mode
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'd' || e.key === 'D') {
                setDebugMode(prev => !prev);
                // Store preference
                localStorage.setItem('bakhoorDebugMode', (!debugMode).toString());
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [debugMode]);

    // Load debug preference
    useEffect(() => {
        const savedPref = localStorage.getItem('bakhoorDebugMode');
        if (savedPref !== null) {
            setDebugMode(savedPref === 'true');
        }
    }, []);

    // Update debug counter and zones
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const percent = Math.round(latest * 100);
        setScrollPercent(percent);

        // Determine current zone based on PostSequenceContent scroll progress
        if (percent < 10) setCurrentZone('BEFORE');
        else if (percent >= 10 && percent < 40) setCurrentZone('START');
        else if (percent >= 40 && percent < 70) setCurrentZone('MIDDLE');
        else if (percent >= 70 && percent < 95) setCurrentZone('END');
        else setCurrentZone('AFTER');
    });

    // SMOOTHING - TUNED for responsiveness
    // stiff: 90 (was 50) -> follows faster
    // damping: 25 (was 20) -> less floaty
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 25,
        mass: 1
    });

    // Fade in later (5%), fade out sooner (95%)
    const opacity = useTransform(
        smoothProgress,
        [0.05, 0.15, 0.85, 0.95],
        [0, 1, 1, 0]
    );

    // MOVE: Right -> Left -> Right (FORCE UPDATE)
    const xPosition = useTransform(
        smoothProgress,
        [0.1, 0.5, 0.9],
        ['75vw', '15vw', '75vw']
    );

    // MOVE (Mobile): Right -> Left -> Right
    const xPositionMobile = useTransform(
        smoothProgress,
        [0.1, 0.5, 0.9],
        ['75vw', '15vw', '75vw']
    );

    // ROTATE
    const rotate = useTransform(
        smoothProgress,
        [0.1, 0.5, 0.9],
        [-5, 0, 5]
    );

    // SCALE
    const scale = useTransform(
        smoothProgress,
        [0.1, 0.5, 0.9],
        [0.85, 1.0, 0.85]
    );

    // Motion value tracking for debug
    useMotionValueEvent(xPosition, "change", (latest) => {
        const vwValue = parseFloat(latest);
        const pixels = (vwValue / 100) * viewportWidth;
        setXPixels(pixels);

        // Calculate visibility (how much of 700px image is on-screen)
        const imageWidth = 700;
        const leftEdge = pixels;
        const rightEdge = pixels + imageWidth;
        const visibleLeft = Math.max(0, leftEdge);
        const visibleRight = Math.min(viewportWidth, rightEdge);
        const visible = Math.max(0, visibleRight - visibleLeft);
        setVisibleWidth(visible);
    });

    useMotionValueEvent(opacity, "change", (latest) => {
        setCurrentOpacity(latest);
    });

    useMotionValueEvent(rotate, "change", (latest) => {
        setCurrentRotate(latest);
    });

    useMotionValueEvent(scale, "change", (latest) => {
        setCurrentScale(latest);
    });

    return (
        // ✅ CHANGED: Logic to be behind text (z-10) but above background
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">

                {/* DESKTOP */}
                <motion.div
                    style={{
                        opacity,
                        left: xPosition, // Use direct left positioning
                        rotate,
                        scale
                    }}
                    className="hidden md:block absolute top-1/2 -translate-y-1/2 w-auto origin-center z-10"
                >
                    <Image
                        src="/images/Bakhoor_1.png"
                        alt="OUD Luxe Bakhoor"
                        width={700}
                        height={900}
                        className="h-[65vh] w-auto drop-shadow-2xl"
                        priority
                        unoptimized
                    />

                    {/* Element Bounding Box (Debug) */}
                    {debugMode && (
                        <div className={`absolute inset-0 border-4 pointer-events-none ${
                            currentZone === 'START' || currentZone === 'END' ? 'border-orange-500' :
                            currentZone === 'MIDDLE' ? 'border-blue-500' :
                            'border-gray-500'
                        }`}>
                            {/* Corner labels */}
                            <div className={`absolute -top-6 -left-2 text-xs px-1 py-0.5 rounded font-mono ${
                                currentZone === 'START' || currentZone === 'END' ? 'bg-orange-500' :
                                currentZone === 'MIDDLE' ? 'bg-blue-500' :
                                'bg-gray-500'
                            } text-white`}>
                                L: {Math.round(xPixels)}px
                            </div>
                            <div className={`absolute -top-6 -right-2 text-xs px-1 py-0.5 rounded font-mono ${
                                currentZone === 'START' || currentZone === 'END' ? 'bg-orange-500' :
                                currentZone === 'MIDDLE' ? 'bg-blue-500' :
                                'bg-gray-500'
                            } text-white`}>
                                R: {Math.round(xPixels + 700)}px
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* MOBILE - Now Moving! */}
                <motion.div
                    style={{
                        opacity,
                        left: xPositionMobile, // Uses distinct mobile path
                        scale: useTransform(scale, (s) => s * 0.6),
                        rotate // Also rotate on mobile
                    }}
                    className="md:hidden absolute top-1/2 -translate-y-1/2 w-auto origin-center"
                >
                    <Image
                        src="/images/Bakhoor_1.png"
                        alt="OUD Luxe Bakhoor"
                        width={500}
                        height={700}
                        className="h-[45vh] w-auto drop-shadow-2xl"
                        priority
                        unoptimized
                    />
                </motion.div>
            </div>

            {/* DEBUG SYSTEM */}
            {debugMode && (
                <>
                    {/* Viewport Grid Lines */}
                    <div className="fixed inset-0 pointer-events-none z-40">
                        {/* 0vw - Red */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-500 opacity-50"></div>
                        <div className="absolute left-0 top-4 bg-red-500 text-white text-xs px-2 py-1 rounded">0vw</div>

                        {/* 25vw - Yellow */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 opacity-50" style={{ left: '25vw' }}></div>
                        <div className="absolute top-4 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold" style={{ left: '25vw' }}>25vw</div>

                        {/* 50vw - Green (Center) */}
                        <div className="absolute top-0 bottom-0 w-1 bg-green-500 opacity-60" style={{ left: '50vw' }}></div>
                        <div className="absolute top-4 bg-green-500 text-white text-xs px-2 py-1 rounded font-bold" style={{ left: '50vw' }}>50vw (CENTER)</div>

                        {/* 75vw - Orange */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-orange-500 opacity-50" style={{ left: '75vw' }}></div>
                        <div className="absolute top-4 bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold" style={{ left: '75vw' }}>75vw</div>

                        {/* 100vw - Red */}
                        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-red-500 opacity-50"></div>
                        <div className="absolute right-0 top-4 bg-red-500 text-white text-xs px-2 py-1 rounded">100vw</div>
                    </div>

                    {/* Keyframe Position Markers */}
                    <div className="fixed inset-0 pointer-events-none z-40">
                        {/* START (10% scroll) - 75vw - RIGHT */}
                        <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75vw' }}>
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-lg"></div>
                                <div className="mt-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold whitespace-nowrap">
                                    START (RIGHT)
                                </div>
                                <div className="text-orange-300 text-xs mt-1">10% scroll</div>
                            </div>
                        </div>

                        {/* MIDDLE (50% scroll) - 15vw - LEFT */}
                        <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '15vw' }}>
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg"></div>
                                <div className="mt-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold whitespace-nowrap">
                                    MIDDLE (LEFT)
                                </div>
                                <div className="text-blue-300 text-xs mt-1">50% scroll</div>
                            </div>
                        </div>

                        {/* END (90% scroll) - 75vw - RIGHT */}
                        <div className="absolute bottom-20" style={{ left: '75vw' }}>
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-lg"></div>
                                <div className="mt-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold whitespace-nowrap">
                                    END (RIGHT)
                                </div>
                                <div className="text-orange-300 text-xs mt-1">90% scroll</div>
                            </div>
                        </div>
                    </div>

                    {/* Visibility Indicator Bar */}
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 px-6 py-3 rounded-lg shadow-2xl z-50 border-2 border-blue-500">
                        <div className="text-xs text-white font-mono mb-2 text-center">IMAGE VISIBILITY</div>
                        <div className="flex items-center gap-2">
                            <div className="w-64 h-6 bg-gray-800 rounded overflow-hidden flex">
                                {/* Green portion (visible) */}
                                <div
                                    className="bg-green-500 h-full transition-all duration-200"
                                    style={{ width: `${(visibleWidth / 700) * 100}%` }}
                                ></div>
                                {/* Red portion (cut off) */}
                                <div
                                    className="bg-red-500 h-full transition-all duration-200"
                                    style={{ width: `${((700 - visibleWidth) / 700) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-white text-xs font-mono">
                                <span className="text-green-400">{Math.round((visibleWidth / 700) * 100)}%</span> visible
                            </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-400 text-center">
                            {visibleWidth < 700 ? (
                                <span className="text-red-400">⚠ {Math.round(700 - visibleWidth)}px cut off!</span>
                            ) : (
                                <span className="text-green-400">✓ Fully visible</span>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Debug Panel */}
                    <div className="fixed top-20 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl z-50 text-xs font-mono border-2 border-blue-500">
                        <div className="font-bold text-blue-400 mb-2 text-sm">DEBUG PANEL</div>
                        <div className="space-y-1">
                            <div>Scroll: <span className="text-green-400 font-bold">{scrollPercent}%</span></div>
                            <div>Zone: <span className="text-yellow-400 font-bold">{currentZone}</span></div>
                            <div className="border-t border-gray-700 my-1"></div>
                            <div>X Pos: <span className="text-cyan-400">{xPosition.get()}</span> <span className="text-gray-400">({Math.round(xPixels)}px)</span></div>
                            <div>Left Edge: <span className="text-cyan-400">{Math.round(xPixels)}px</span></div>
                            <div>Right Edge: <span className="text-cyan-400">{Math.round(xPixels + 700)}px</span></div>
                            <div>Viewport: <span className="text-orange-400">{viewportWidth}px</span></div>
                            <div className="border-t border-gray-700 my-1"></div>
                            <div>Image Width: <span className="text-purple-400">700px</span></div>
                            <div>Visible: <span className="text-green-400">{Math.round(visibleWidth)}px ({Math.round((visibleWidth / 700) * 100)}%)</span></div>
                            <div>Overflow: <span className="text-red-400">{Math.max(0, Math.round(xPixels + 700 - viewportWidth))}px</span></div>
                            <div className="border-t border-gray-700 my-1"></div>
                            <div>Opacity: <span className="text-gray-300">{currentOpacity.toFixed(2)}</span></div>
                            <div>Rotate: <span className="text-gray-300">{currentRotate.toFixed(1)}°</span></div>
                            <div>Scale: <span className="text-gray-300">{currentScale.toFixed(2)}</span></div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
                            Press 'D' to toggle
                        </div>
                    </div>

                    {/* Debug Toggle Button */}
                    <button
                        onClick={() => setDebugMode(false)}
                        className="fixed top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold z-50 shadow-lg"
                    >
                        HIDE DEBUG
                    </button>
                </>
            )}

            {!debugMode && (
                <button
                    onClick={() => setDebugMode(true)}
                    className="fixed top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold z-50 shadow-lg"
                >
                    SHOW DEBUG
                </button>
            )}
        </div>
    );
}