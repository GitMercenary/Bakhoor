'use client';

import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TravelingMachineProps {
    scrollRef: React.RefObject<HTMLElement>;
}

export default function TravelingMachine({ scrollRef }: TravelingMachineProps) {

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

    // SMOOTHING - Restored smoothness but eliminated bounciness
    // Damping > 2*sqrt(stiffness*mass) makes it overdamped (no bounce)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 25,
        mass: 1,
        restDelta: 0.001
    });

    // Opacity is now locked to 1. 
    // The physical 3D clipping is done entirely natively by the z-40 HeroCanvas covering it from the top
    // and the z-50 FinalCTA covering it from the bottom.
    const opacity = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 1]
    );

    // MOVE: Right -> Left -> Right (hardware accelerated via 'x' property)
    const xPosition = useTransform(
        smoothProgress,
        [0.6, 0.75, 0.81, 0.87],
        ['75vw', '75vw', '15vw', '75vw']
    );

    // MOVE VERTICALLY (Y-Axis)
    // 75% = Right Side, Top
    // 81% = Left Side, Dipped
    // 87% = Right Side, Top
    const yPosition = useTransform(
        smoothProgress,
        [0.6, 0.75, 0.81, 0.87],
        ['0vh', '0vh', '25vh', '0vh']
    );

    // MOVE VERTICALLY (Y-Axis Mobile)
    const yPositionMobile = useTransform(
        smoothProgress,
        [0.6, 0.75, 0.81, 0.87],
        ['0vh', '0vh', '20vh', '0vh']
    );

    // ROTATE: Tilt into the move
    const rotate = useTransform(
        smoothProgress,
        [0.6, 0.75, 0.81, 0.87],
        [0, 0, -5, 0]
    );

    // SCALE: Grow when hitting the center
    const scale = useTransform(
        smoothProgress,
        [0.6, 0.75, 0.81, 0.87],
        [0.9, 0.9, 1.05, 0.9]
    );

    return (
        <>
            {/* ✅ CHANGED: Dropped z-index to 10 to ensure it travels BEHIND text sections */}
            <div className="fixed inset-0 w-full h-screen pointer-events-none z-10">
                <div className="relative w-full h-full flex items-center justify-center">

                    {/* DESKTOP */}
                    <motion.div
                        style={{
                            opacity,
                            left: 0,
                            x: xPosition, // High-performance GPU hardware acceleration
                            top: '50%',
                            marginTop: '-32.5vh', // Offsets exactly half its 65vh height
                            y: yPosition, // Applies the animated dipping translation
                            rotate,
                            scale
                        }}
                        className="hidden md:block absolute w-auto origin-center z-10"
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


                    </motion.div>

                    {/* MOBILE - Center stays fixed, only Y dips */}
                    <motion.div
                        style={{
                            opacity,
                            left: '50%',
                            x: '-50%',
                            top: '50%',
                            marginTop: '-22.5vh', // Offsets half of 45vh height
                            y: yPositionMobile,
                            scale, // Use base scale, image is already sized via h-[45vh]
                            rotate // Also rotate on mobile
                        }}
                        className="md:hidden absolute w-auto origin-center z-10"
                    >
                        <Image
                            src="/images/Bakhoor_1.png"
                            alt="OUD Luxe Bakhoor"
                            width={250}
                            height={350}
                            className="w-[60vw] max-w-[200px] h-auto drop-shadow-2xl"
                            priority
                            unoptimized
                        />
                    </motion.div>
                </div>
            </div>


        </>
    );
}