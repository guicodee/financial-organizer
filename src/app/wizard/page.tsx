import CurrencyComboBox from '@/components/currency-combo-box';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@clerk/nextjs/server';
import { Eclipse } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import WizardMessage from './components/wizard-message';

export default async function Wizard() {
	const user = await currentUser();
	if (!user) redirect('/sign-in');

	return (
		<div className="container max-w-2xl flex flex-col items-center justify-center gap-4 px-4">
			<div>
				<h1 className="text-center text-3xl">
					Bem vindo,{' '}
					<span className="ml-2 font-bold">{user.firstName}! 👋</span>
				</h1>
				<WizardMessage />
			</div>
			<Separator />
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Moeda</CardTitle>
					<CardDescription>
						Defina sua moeda padrão para transações
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CurrencyComboBox />
				</CardContent>
			</Card>
			<Separator />
			<Button className="w-full" asChild>
				<Link href={'/'}>Terminei! leve-me ao painel</Link>
			</Button>
			<div className="mt-8 flex items-center gap-2">
				<Eclipse className="md:h-8 md:w-8 md:hidden stroke stroke-yellow-400 stroke-[1.5]" />
				<Logo />
			</div>
		</div>
	);
}
