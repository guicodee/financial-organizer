'use client';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';
import { UserSettings } from '@prisma/client';
import { differenceInDays, startOfMonth } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';
import CategoriesStats from './categories/categories-stats';
import InfoCards from './stats-card/info-cards';

interface OverviewProps {
	userSettings: UserSettings;
}

export default function Overview({ userSettings }: OverviewProps) {
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
		from: startOfMonth(new Date()),
		to: new Date(),
	});

	return (
		<>
			<div className="container mx-auto px-8 py-6 flex flex-wrap items-end justify-between gap-4">
				<h2 className="text-3xl font-bold">Visão geral</h2>
				<div className="flex items-center gap-3">
					<DateRangePicker
						initialDateFrom={dateRange.from}
						initialDateTo={dateRange.to}
						showCompare={false}
						onUpdate={(values) => {
							const { from, to } = values.range;

							if (!from || !to) return;
							if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
								toast.error(
									`O período selecionado é muito grande. O intervalo máximo permitido é de ${MAX_DATE_RANGE_DAYS} dias`
								);
								return;
							}

							setDateRange({ from, to });
						}}
					/>
				</div>
			</div>

			<div className="container w-full flex flex-col mx-auto space-y-4 px-8">
				<InfoCards
					userSettings={userSettings}
					from={dateRange.from}
					to={dateRange.to}
				/>

				<CategoriesStats
					userSettings={userSettings}
					from={dateRange.from}
					to={dateRange.to}
				/>
			</div>
		</>
	);
}
