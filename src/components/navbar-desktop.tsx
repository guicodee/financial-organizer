import { items } from '@/data/items';
import { UserButton } from '@clerk/nextjs';
import Logo from './logo';
import NavbarItem from './navbar-item';
import { ThemeSwitcherBtn } from './theme-switcher-btn';

export default function NavbarDesktop() {
	return (
		<div className="hidden border-separate border-b bg-background md:block">
			<nav className="container mx-auto flex items-center justify-between px-8 space-x-4">
				<div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
					<Logo />
					<div className="flex h-full gap-4">
						{items.map((item) => (
							<NavbarItem
								key={item.label}
								link={item.link}
								label={item.label}
							/>
						))}
					</div>
				</div>
				<div className="flex items-center gap-4 left-2">
					<ThemeSwitcherBtn />
					<UserButton afterSignOutUrl="/sign-in" />
				</div>
			</nav>
		</div>
	);
}
