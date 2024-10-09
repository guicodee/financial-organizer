'use client';

import { getCategoriesStatsResponseType } from '@/app/api/stats/categories/route';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoriesCardProps {
	formatter: Intl.NumberFormat;
	type: TransactionType;
	data: getCategoriesStatsResponseType;
}

export default function CategoriesCard({
	data,
	formatter,
	type,
}: CategoriesCardProps) {
	const filteredData = data.filter((element) => element.type === type);
	const total = filteredData.reduce(
		(acc, element) => acc + (element._sum?.amount || 0),
		0
	);

	return (
		<Card className="h-80 w-full col-span-6">
			<CardHeader>
				<CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
					<p
						className={cn(
							type === 'income' ? 'text-emerald-500' : 'text-rose-500'
						)}
					>
						{type === 'income' ? 'Ganhos' : 'Gastos'}{' '}
						<span className="text-zinc-400">por categoria</span>
					</p>
				</CardTitle>
			</CardHeader>
			<div className="flex items-center justify-between gap-2">
				{filteredData.length === 0 && (
					<div className="flex h-60 w-full flex-col items-center justify-center text-center">
						Não há dados para o período selecionado
						<p className="text-sm text-muted-foreground">
							Tente selecionar um período diferente ou tente adicionar um novo{' '}
							{type === 'income' ? 'ganho' : 'gasto'}
						</p>
					</div>
				)}

				{filteredData.length > 0 && (
					<ScrollArea className="h-60 w-full px-4">
						<div className="flex w-full flex-col gap-4 p-4">
							{filteredData.map((item) => {
								const amount = item._sum.amount || 0;
								const percentage = (amount * 100) / (total || amount);

								return (
									<div key={item.category} className="flex flex-col gap-2">
										<div className="flex items-center justify-between">
											<span className="flex items-center text-gray-400">
												{item.categoryIcon}
												{item.category}
												<span className="ml-2 text-xs text-muted-foreground">
													({percentage.toFixed(0)}%)
												</span>
											</span>

											<span className="text-sm text-zinc-400">
												{formatter.format(amount)}
											</span>
										</div>

										<Progress
											value={percentage}
											indicator={
												type === 'income' ? 'bg-emerald-500' : 'bg-red-500'
											}
										/>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				)}
			</div>
		</Card>
	);
}
