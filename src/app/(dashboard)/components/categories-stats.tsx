'use client';

import SkeletonWrapper from '@/components/skeleton-wrapper';
import DateToUTCDate, { GetFormatterForCurrency } from '@/lib/helpers';
import { UserSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import CategoriesCard from './categories-card';

interface CategoriesCardProps {
	userSettings: UserSettings;
	from: Date;
	to: Date;
}

export default function CategoriesStats({
	from,
	to,
	userSettings,
}: CategoriesCardProps) {
	const statsQuery = useQuery({
		queryKey: ['overview', 'stats', 'categories', from, to],
		queryFn: () =>
			fetch(
				`/api/stats/categories?from=${DateToUTCDate(from).toISOString()}&to=${DateToUTCDate(to).toISOString()}`
			).then((res) => res.json()),
	});

	const formatter = useMemo(() => {
		return GetFormatterForCurrency(userSettings.currency);
	}, [userSettings.currency]);

	return (
		<div className="flex w-full gap-2 max-md:flex-wrap">
			<SkeletonWrapper isLoading={statsQuery.isLoading}>
				<CategoriesCard
					formatter={formatter}
					type="income"
					data={statsQuery.data || []}
				/>
			</SkeletonWrapper>
			<SkeletonWrapper isLoading={statsQuery.isLoading}>
				<CategoriesCard
					formatter={formatter}
					type="expense"
					data={statsQuery.data || []}
				/>
			</SkeletonWrapper>
		</div>
	);
}
