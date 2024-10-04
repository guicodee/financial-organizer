import { currencies } from '@/data/currencies';
import { z } from 'zod';
export const UpdateUserSettingsSchema = z.object({
	currency: z.custom(
		(value) => {
			const found = currencies.some((c) => c.value === value);

			if (!found) {
				throw new Error(`Moeda inválida: ${value}`);
			}

			return found;
		},
		{
			message: 'Moeda inválida.',
		}
	),
});
