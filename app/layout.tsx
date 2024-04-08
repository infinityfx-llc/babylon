import { FluidProvider } from '@infinityfx/fluid';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: {
        default: 'Next Fluid Template',
        template: '%s | Next Fluid Template'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {

    return <html lang="en">
        <FluidProvider>
            <body>
                {children}
            </body>
        </FluidProvider>
    </html>;
}
