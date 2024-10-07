'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function WizardMessage() {
	const { theme } = useTheme();

	return (
		<>
			<h2
				className={cn(
					'mt-2 text-center text-base',
					theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'
				)}
			>
				Vamos começar configurando sua moeda.
			</h2>
			<h3
				className={cn(
					'mt-1 text-center text-sm',
					theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'
				)}
			>
				Você pode alterar essas configurações a qualquer momento.
			</h3>
		</>
	);
}
