'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from './ui/button';

interface NavbarItemProps {
	link: string;
	label: string;
	onClick?: () => void;
}

export default function NavbarItem({ label, link, onClick }: NavbarItemProps) {
	const pathname = usePathname();
	const isActive = pathname === link;

	return (
		<div className="relative flex items-center">
			<Link
				href={link}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'w-full justify-start text-base text-muted-foreground hover:text-foreground',
					isActive && 'text-zinc-100'
				)}
				onClick={onClick}
			>
				{label}
			</Link>
			{isActive && (
				<div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-amber-200 md:block" />
			)}
		</div>
	);
}
