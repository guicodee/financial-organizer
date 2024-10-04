export interface Currency {
	value: string;
	label: string;
	locale: string;
}

export const currencies: Currency[] = [
	{ value: 'USD', label: '$ Dolar', locale: 'en-US' },
	{ value: 'EUR', label: '€ Euro', locale: 'de-DE' },
	{ value: 'BRL', label: '$ Real Brasileiro', locale: 'pt-BR' },
];
