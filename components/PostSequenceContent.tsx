'use client';

import { useRef } from 'react';
import { productData } from '@/data/product';
import TravelingMachine from './TravelingMachine';

export default function PostSequenceContent() {
    const containerRef = useRef(null);

    return (
        // ✅ FIXED: Added h-[300vh] to create scroll container
        <div ref={containerRef} className="relative h-[300vh]">
            {/* TravelingMachine overlays with absolute positioning */}
            <TravelingMachine scrollRef={containerRef} />

            {/* Content sections - each is sticky */}
            <div className="relative z-0">
                {productData.contentSections.map((section, index) => (
                    <section
                        key={section.id}
                        style={{ backgroundColor: section.background }}
                        className="sticky top-0 min-h-screen flex items-center justify-center px-8 py-32"
                    >
                        {/* DESKTOP: Text on left/center/right */}
                        <div className="max-w-3xl w-full hidden md:block relative z-20">
                            <div className={`
                ${index === 0 ? 'text-left' : ''}
                ${index === 1 ? 'text-right' : ''}
                ${index === 2 ? 'text-left' : ''}
              `}>
                                <h2 className="text-6xl lg:text-8xl font-display font-black uppercase text-white mb-8 leading-none">
                                    {section.title}
                                </h2>
                                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                                    {section.description}
                                </p>
                            </div>
                        </div>

                        {/* MOBILE: Text at top, machine at bottom */}
                        <div className="w-full md:hidden">
                            <div className="text-center px-4">
                                <h2 className="text-4xl font-display font-black uppercase text-white mb-6 leading-tight">
                                    {section.title}
                                </h2>
                                <p className="text-base text-gray-300 leading-relaxed max-w-md mx-auto mb-48">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}