'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10 pt-0 pb-8 relative z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="block mb-6">
                            <span className="text-luxeGold text-3xl font-display font-bold tracking-wider">
                                OUD LUXE™
                            </span>
                        </Link>
                        <p className="text-gray-400 max-w-xs leading-relaxed">
                            Experience the future of tradition. The world's first premium electric bakhoor burner,
                            crafted for the modern connoisseur.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Explore</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-luxeGold transition-colors">
                                    Shop Collection
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-luxeGold transition-colors">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-luxeGold transition-colors">
                                    Technology
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-luxeGold transition-colors">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Socials / Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Connect</h3>
                        <div className="flex space-x-6 mb-8">
                            {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-gray-400 hover:text-luxeGold transition-colors text-sm uppercase tracking-wider"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            Join our exclusive list for early access to new releases.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} OUD LUXE. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
