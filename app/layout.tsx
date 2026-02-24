import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'OUD Luxe™ - Electric Bakhoor',
    description: 'Authentic Arabian incense experience. Traditional meets modern.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
