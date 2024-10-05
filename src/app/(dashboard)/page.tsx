import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { CreditCard, DollarSign } from 'lucide-react';
import { redirect } from 'next/navigation';
import DialogTransaction from './components/dialog-transaction';

export default async function Page() {
	const user = await currentUser();
	if (!user) redirect('/sign-in');

	const userSettings = await prisma.userSettings.findUnique({
		where: {
			userId: user.id,
		},
	});
	if (!userSettings) redirect('/sign-in');

	return (
		<div className="h-full bg-background">
			<div className="border-b bg-card">
				<div className="container flex flex-wrap items-center justify-between gap-6 py-8 mx-auto px-8">
					<p className="text-2xl font-bold">Olá, {user.firstName}! 👋</p>

					<div className="flex items-center gap-3">
						<DialogTransaction
							trigger={
								<Button
									variant={'outline'}
									className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-800 flex items-center gap-1"
								>
									Ganhos
									<DollarSign size={14} color="#00FF00" />
								</Button>
							}
							type="income"
						/>
						<DialogTransaction
							trigger={
								<Button
									variant={'outline'}
									className="border-rose-500 bg-rose-950 text-white hover:bg-rose-800 flex items-center gap-1"
								>
									Gastos
									<CreditCard size={14} color="#FF4040" />
								</Button>
							}
							type="expense"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
