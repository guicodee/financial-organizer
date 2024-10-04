import RootProviders from '@/components/providers/root-providers';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Organizador financeiro',
	description:
		'A ferramenta ideal para quem busca organizar suas finanças de forma prática e eficiente.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="pt-BR" className="dark" style={{ colorScheme: 'dark' }}>
				<body className={`${poppins.className} antialiased`}>
					<Toaster richColors position="bottom-right" />
					<RootProviders>{children}</RootProviders>
				</body>
			</html>
		</ClerkProvider>
	);
}
