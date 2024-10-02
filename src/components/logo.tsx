import { PiggyBank } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<PiggyBank className="h-11 w-11 stroke stroke-amber-500 stroke-[1.5]" />
			<p className="font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl tracking-tighter text-transparent">
				Financial Organizer
			</p>
		</Link>
	);
}
