import { Card } from '@/components/ui/card';
import { ReactNode, useCallback } from 'react';
import CountUp from 'react-countup';

interface StatsCardProps {
	formatter: Intl.NumberFormat;
	icon: ReactNode;
	title: string;
	value: number;
}

export default function StatsCard({
	formatter,
	icon,
	title,
	value,
}: StatsCardProps) {
	const formatFn = useCallback(
		(value: number) => {
			return formatter.format(value);
		},
		[formatter]
	);

	return (
		<Card className="flex h-24 w-full items-center gap-2 p-4">
			{icon}
			<div className="flex flex-col gap-0">
				<p className="text-muted-foreground text-start">{title}</p>
				<CountUp
					preserveValue
					redraw={false}
					end={value}
					decimals={2}
					formattingFn={formatFn}
					className="text-xl"
				/>
			</div>
		</Card>
	);
}
