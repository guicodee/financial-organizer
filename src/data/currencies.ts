export interface Currencies {
	value: string;
	label: string;
	locale: string;
}

export const currencies: Currencies[] = [
	{ value: 'USD', label: '$ Dolar', locale: 'en-US' },
	{ value: 'EUR', label: '€ Euro', locale: 'de-DE' },
	{ value: 'BRL', label: '$ Real Brasileiro', locale: 'pt-BR' },
];
