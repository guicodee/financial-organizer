import { Eclipse } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Eclipse className="md:h-8 md:w-8 max-md:hidden stroke stroke-yellow-400 stroke-[1.5]" />
			<p className="font-bold md:text-xl max-md:text-sm tracking-wider">
				Financial Organizer
			</p>
		</Link>
	);
}
