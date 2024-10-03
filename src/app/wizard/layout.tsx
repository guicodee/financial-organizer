import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className="relative h-screen flex flex-col items-center justify-center">
			{children}
		</div>
	);
}
