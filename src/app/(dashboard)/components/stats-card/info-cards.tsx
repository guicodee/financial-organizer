'use client';

import { getBalanceStatsType } from '@/app/api/stats/balance/route';
import SkeletonWrapper from '@/components/skeleton-wrapper';
import DateToUTCDate, { GetFormatterForCurrency } from '@/lib/helpers';
import { UserSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useMemo } from 'react';
import StatsCard from './summary-card';

interface InfoCardsProps {
	userSettings: UserSettings;
	from: Date;
	to: Date;
}

export default function InfoCards({ from, to, userSettings }: InfoCardsProps) {
	const statsQuery = useQuery<getBalanceStatsType>({
		queryKey: ['overview', 'stats', from, to],
		queryFn: () =>
			fetch(
				`/api/stats/balance?from=${DateToUTCDate(from).toISOString()}&to=${DateToUTCDate(to).toISOString()}`
			).then((res) => res.json()),
	});

	const formatter = useMemo(() => {
		return GetFormatterForCurrency(userSettings.currency);
	}, [userSettings.currency]);

	const income = statsQuery.data?.income || 0;
	const expense = statsQuery.data?.expense || 0;
	const balance = income - expense;

	return (
		<div className="relative flex w-full gap-2 max-md:flex-wrap">
			<SkeletonWrapper isLoading={statsQuery.isLoading}>
				<StatsCard
					formatter={formatter}
					value={income}
					title="Income"
					icon={
						<TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
					}
				/>
			</SkeletonWrapper>
			<SkeletonWrapper isLoading={statsQuery.isLoading}>
				<StatsCard
					formatter={formatter}
					value={expense}
					title="Expense"
					icon={
						<TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-rose-500 bg-rose-400/10" />
					}
				/>
			</SkeletonWrapper>
			<SkeletonWrapper isLoading={statsQuery.isLoading}>
				<StatsCard
					formatter={formatter}
					value={balance}
					title="Balance"
					icon={
						<Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
					}
				/>
			</SkeletonWrapper>
		</div>
	);
}
