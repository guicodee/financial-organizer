import RootProviders from '@/components/providers/root-providers';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

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
				<body className={`${roboto.className} antialiased`}>
					<RootProviders>{children}</RootProviders>
				</body>
			</html>
		</ClerkProvider>
	);
}
