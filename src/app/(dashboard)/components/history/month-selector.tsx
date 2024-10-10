import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Period } from '@/lib/types';

interface MonthSelectorProps {
	period: Period;
	setPeriod: (period: Period) => void;
}

export default function MonthSelector({
	period,
	setPeriod,
}: MonthSelectorProps) {
	return (
		<Select
			value={period.month.toString()}
			onValueChange={(value) =>
				setPeriod({
					year: period.year,
					month: parseInt(value),
				})
			}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>

			<SelectContent>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
					const monthString = new Date(period.year, month, 1).toLocaleString(
						'default',
						{ month: 'long' }
					);

					return (
						<SelectItem key={month} value={month.toString()}>
							{monthString}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
