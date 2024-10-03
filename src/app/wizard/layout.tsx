import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className="relativeh-screen flex flex-col items-center justify-center">
			{children}
		</div>
	);
}
