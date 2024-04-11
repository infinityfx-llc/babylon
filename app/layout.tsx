import { FluidProvider } from '@infinityfx/fluid';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    fallback: ['system-ui', 'sans-serif']
})

export const metadata: Metadata = {
    title: {
        default: "Babel's library",
        template: "%s | Babel's library"
    }
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {

    return <html lang="en" className={manrope.variable}>
        <FluidProvider>
            <body>
                {children}
            </body>
        </FluidProvider>
    </html>;
}
