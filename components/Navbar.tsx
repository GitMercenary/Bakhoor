'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo - Enhanced with drop shadow and better weight */}
                <div className="text-luxeGold text-xl md:text-2xl font-display tracking-wider drop-shadow-lg font-bold">
                    OUD LUXE™
                </div>

                {/* Buy Button - WHITE - Responsive sizing */}
                <button className="px-4 md:px-6 py-2 md:py-3 bg-white text-black text-sm md:text-base font-bold rounded-full hover:scale-105 hover:bg-luxeGold hover:text-black transition-all">
                    BUY NOW - $79.99
                </button>
            </div>
        </motion.nav>
    );
}