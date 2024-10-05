'use client';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useCallback, useState } from 'react';
import CategoryDialog from './category-dialog';
import CategoryRow from './category-row';

interface CategoryPickerProps {
	type: TransactionType;
}

export default function CategoryPicker({ type }: CategoryPickerProps) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	const { data: categoriesQuery } = useQuery({
		queryKey: ['categories', type],
		queryFn: () =>
			fetch(`/api/categories?type=${type}`).then((res) => res.json()),
	});

	const selectedCategory = categoriesQuery?.find(
		(category: Category) => category.name === value
	);

	const successCallback = useCallback(
		(category: Category) => {
			setValue(category.name);
			setOpen((prev) => !prev);
		},
		[setValue, setOpen]
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{selectedCategory ? (
						<CategoryRow category={selectedCategory} />
					) : (
						'Selecione a categoria'
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command onSubmit={(e) => e.preventDefault()}>
					<CommandInput placeholder="Procure a categoria..." />
					<CategoryDialog type={type} successCallback={successCallback} />
					<CommandEmpty>
						<p>Categoria não encontrada</p>
						<p className="text-xs text-muted-foreground">
							Cria uma nova categoria
						</p>
					</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{categoriesQuery &&
								categoriesQuery.map((category: Category) => (
									<CommandItem
										key={category.name}
										onSelect={() => {
											setValue(category.name);
											setOpen((prev) => !prev);
										}}
									>
										<CategoryRow category={category} />
										<Check
											className={cn(
												'ml-2 w-4 h-4 opacity-0',
												value === category.name && 'opacity-100'
											)}
										/>
									</CommandItem>
								))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
