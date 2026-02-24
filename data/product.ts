export const productData = {
    name: 'OUD Luxe™',
    subtitle: 'Electric Bakhoor',
    price: 79.99,
    currency: 'USD',
    priceInr: 6899,

    // Color theme (Gold & Black luxury)
    colors: {
        primary: '#D4AF37', // Luxe Gold
        secondary: '#000000', // Deep Black
        accent: '#1A1A1A', // Charcoal
        glow: '#10B981', // Green power button
    },

    // Static assets
    assets: {
        closedMachine: '/images/Bakhoor_1.png',
        openMachine: '/images/Bakhoor_2.png',
        sequenceFolder: '/images/Bakhoor/',
        sequencePrefix: 'ezgif-frame-',
        totalFrames: 249,
    },

    // Story sections (overlays during the 249-frame sequence)
    storySequence: [
        {
            id: 1,
            title: 'TRADITION REIMAGINED',
            subtitle: 'Arabian Luxury Meets Modern Technology',
            scrollStart: 0.05,
            scrollPeak: 0.15,
            scrollEnd: 0.25,
        },
        {
            id: 2,
            title: 'AUTHENTIC INCENSE',
            subtitle: 'Experience The Soul of Oud',
            scrollStart: 0.25,
            scrollPeak: 0.35,
            scrollEnd: 0.45,
        },
        {
            id: 3,
            title: 'ELECTRIC PRECISION',
            subtitle: 'Perfect Heat. Perfect Fragrance.',
            scrollStart: 0.45,
            scrollPeak: 0.55,
            scrollEnd: 0.65,
        },
    ],

    // Post-sequence content sections (where the traveling machine moves)
    contentSections: [
        {
            id: 'heritage',
            title: 'ROOTED IN HERITAGE',
            description: 'Authentic Arabian incense experience with the convenience of modern electric technology. No charcoal. No smoke damage. Pure fragrance.',
            background: '#1A1A1A', // Dark charcoal
        },
        {
            id: 'design',
            title: 'CRAFTED FOR LUXURY',
            description: 'Premium aluminum body with gold Arabic calligraphy. Traditional meets modern in every detail. A centerpiece for your home.',
            background: '#0D0D0D', // Darker shade
        },
        {
            id: 'experience',
            title: 'ELEVATE YOUR SPACE',
            description: 'Long-lasting fragrance. Adjustable temperature control. The perfect blend of tradition and innovation for the modern connoisseur.',
            background: '#000000', // Pure black
        },
    ],

    // Final CTA
    finalTagline: 'EXPERIENCE OUD LUXE™',
    ctaText: 'BUY NOW - $79.99',
};
