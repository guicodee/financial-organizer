'use client';

import * as React from 'react';

import UpdateUserSettings from '@/app/wizard/_actions/user-settings';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Currency, currencies } from '@/data/currencies';
import { useMediaQuery } from '@/hooks/use-media-query';
import { UserSettings } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import SkeletonWrapper from './skelleton-wrapper';

export default function CurrencyComboBox() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');
	const [selectionOption, setSelectionOption] = React.useState<Currency | null>(
		null
	);

	const userSettings = useQuery<UserSettings>({
		queryKey: ['userSettings'],
		queryFn: () => fetch('/api/user-settings').then((res) => res.json()),
	});

	React.useEffect(() => {
		if (!userSettings.data) return;

		const userCurrency = currencies.find(
			(currency) => currency.value === userSettings.data.currency
		);

		if (userCurrency) setSelectionOption(userCurrency);
	}, [userSettings.data]);

	const mutation = useMutation({
		mutationFn: UpdateUserSettings,
		onSuccess: (data: UserSettings) => {
			toast.success('Moeda atualizada com sucesso 🎉.', {
				id: 'update-currency',
			});

			setSelectionOption(
				currencies.find((c) => c.value === data.currency) || null
			);
		},
		onError: (e) => {
			toast.error('Algo deu errado.', {
				id: 'update-currency',
			});
		},
	});

	const selectedCurrency = React.useCallback(
		(currency: Currency | null) => {
			if (!currency) {
				toast.error('Selecione uma moeda.');
				return;
			}

			toast.loading('Atualizando moeda...', {
				id: 'update-currency',
			});

			mutation.mutate(currency.value);
		},
		[mutation]
	);

	if (isDesktop) {
		return (
			<SkeletonWrapper isLoading={userSettings.isFetching}>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-fit justify-start"
							disabled={mutation.isPending}
						>
							{selectionOption ? (
								<>{selectionOption.label}</>
							) : (
								<>Selecione a moeda</>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-fit p-0" align="start">
						<OptionList
							setOpen={setOpen}
							setSelectedOption={selectedCurrency}
						/>
					</PopoverContent>
				</Popover>
			</SkeletonWrapper>
		);
	}

	return (
		<SkeletonWrapper isLoading={userSettings.isFetching}>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						variant="outline"
						className="w-fit justify-start"
						disabled={mutation.isPending}
					>
						{selectionOption ? (
							<>{selectionOption.label}</>
						) : (
							<>Selecione a moeda</>
						)}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mt-4 border-t">
						<OptionList
							setOpen={setOpen}
							setSelectedOption={selectedCurrency}
						/>
					</div>
				</DrawerContent>
			</Drawer>
		</SkeletonWrapper>
	);
}

function OptionList({
	setOpen,
	setSelectedOption,
}: {
	setOpen: (open: boolean) => void;
	setSelectedOption: (status: Currency | null) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder="Filtre as moedas..." />
			<CommandList>
				<CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
				<CommandGroup>
					{currencies.map((currency: Currency) => (
						<CommandItem
							key={currency.value}
							value={currency.value}
							onSelect={(value) => {
								setSelectedOption(
									currencies.find((priority) => priority.value === value) ||
										null
								);
								setOpen(false);
							}}
						>
							{currency.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
