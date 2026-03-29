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
            paragraphs: [
                'Experience an authentic Arabian incense journey with the unparalleled convenience of modern electric technology. OUD Luxe™ reimagines a centuries-old tradition, bringing the rich, captivating aromas of the Middle East directly into your modern lifestyle without the hassle of traditional methods.',
                'Say goodbye to the mess of charcoal and the risk of smoke damage. Our state-of-the-art heating element ensures an even, slow burn that releases only the purest fragrance of your favorite bakhoor, preserving its complex notes and therapeutic qualities.'
            ],
            background: '#0a0a0c', // Deep midnight
        },
        {
            id: 'design',
            title: 'CRAFTED FOR LUXURY',
            paragraphs: [
                'Encased in a premium, aerospace-grade aluminum body, every OUD Luxe™ device is a masterpiece of design. The sleek, minimalist silhouette is elevated by intricate gold Arabic calligraphy, creating a striking visual contrast that commands attention in any room.',
                'This is not just a functional device; it is a statement piece. The careful balance of traditional aesthetics and modern industrial design results in a centerpiece that complements both classic and contemporary interiors with effortless grace.'
            ],
            background: '#0c0a08', // Deep bronze/brown
        },
        {
            id: 'experience',
            title: 'ELEVATE YOUR SPACE',
            paragraphs: [
                'Transform your environment instantly with long-lasting, enveloping fragrance. The advanced temperature control system allows you to customize the intensity of the scent, ensuring the perfect ambiance for quiet evenings, social gatherings, or moments of meditation.',
                'Designed for the modern connoisseur, OUD Luxe™ operates in near silence with intuitive controls. It is the ultimate fusion of ancestral wisdom and innovative engineering, offering a sensory upgrade that elevates your daily rituals.'
            ],
            background: '#080c0a', // Deep forest/emerald black
        },
    ],

    // Final CTA
    finalTagline: 'EXPERIENCE OUD LUXE™',
    ctaText: 'BUY NOW - $79.99',
};
