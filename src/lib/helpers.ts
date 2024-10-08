import { currencies } from '@/data/currencies';

export default function DateToUTCDate(date: Date) {
	return new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
			date.getMilliseconds()
		)
	);
}

export function GetFormatterForCurrency(userCurrency: string) {
	const locale = currencies.find(
		(currency) => currency.value === userCurrency
	)?.locale;

	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: userCurrency,
	});
}
