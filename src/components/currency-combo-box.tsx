'use client';

import * as React from 'react';

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
import { Currencies, currencies } from '@/data/currencies';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function CurrencyComboBox() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');
	const [selectionOption, setSelectionOption] =
		React.useState<Currencies | null>(null);

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-fit justify-start">
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
						setSelectedOption={setSelectionOption}
					/>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="w-fit justify-start">
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
						setSelectedOption={setSelectionOption}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function OptionList({
	setOpen,
	setSelectedOption,
}: {
	setOpen: (open: boolean) => void;
	setSelectedOption: (status: Currencies | null) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder="Filtre as moedas..." />
			<CommandList>
				<CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
				<CommandGroup>
					{currencies.map((currency: Currencies) => (
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
