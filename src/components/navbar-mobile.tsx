import { items } from '@/data/items';
import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Logo from './logo';
import NavbarItem from './navbar-item';
import { ThemeSwitcherBtn } from './theme-switcher-btn';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export default function NavbarMobile() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="block border-separate bg-background md:hidden">
			<nav className="container flex items-center justify-between px-8 mx-auto">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant={'outline'} size={'icon'}>
							<Menu className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</SheetTrigger>
					<SheetContent className="w-[390px] sm:w-[540px]" side={'left'}>
						<Logo />
						<div className="flex flex-col gap-2 pt-8">
							{items.map((item) => (
								<NavbarItem
									key={item.label}
									label={item.label}
									link={item.link}
									onClick={() => setIsOpen((prev) => !prev)}
								/>
							))}
						</div>
					</SheetContent>
				</Sheet>
				<div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
					<Logo />
				</div>
				<div className="flex items-center gap-4">
					<ThemeSwitcherBtn />
					<UserButton afterSignOutUrl="/sign-in" />
				</div>
			</nav>
		</div>
	);
}
