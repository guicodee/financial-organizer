'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import DateToUTCDate from '@/lib/helpers';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
	CreateTransactionSchema,
	CreateTransactionSchemaType,
} from '@/schema/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { ReactNode, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CreateTransaction from '../../_actions/transactions';
import CategoryPicker from './category-picker';

interface DialogTransactionProps {
	trigger: ReactNode;
	type: TransactionType;
}

export default function DialogTransaction({
	trigger,
	type,
}: DialogTransactionProps) {
	const [open, setOpen] = useState(false);
	const form = useForm<CreateTransactionSchemaType>({
		resolver: zodResolver(CreateTransactionSchema),
		defaultValues: {
			type,
			date: new Date(),
		},
	});

	const handleCategoryChange = useCallback(
		(value: string) => {
			form.setValue('category', value);
		},
		[form]
	);

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: CreateTransaction,
		onSuccess: () => {
			toast.success('Transação criada com sucesso 🎉', {
				id: 'create-transaction',
			});

			form.reset({
				type,
				description: '',
				amount: 0,
				date: new Date(),
				category: undefined,
			});

			queryClient.invalidateQueries({
				queryKey: ['overview'],
			});

			setOpen((prev) => !prev);
		},
	});

	const onSubmit = useCallback(
		(values: CreateTransactionSchemaType) => {
			toast.loading('Criando transação...', {
				id: 'create-transaction',
			});

			mutate({
				...values,
				date: DateToUTCDate(values.date),
			});
		},
		[mutate]
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Crie uma nova transação
						<span
							className={cn(
								'm-1',
								type === 'income' ? 'text-emerald-500' : 'text-rose-500'
							)}
						>
							{type === 'income' ? 'ganho' : 'gasto'}
						</span>
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Input defaultValue={''} {...field} />
									</FormControl>
									<FormDescription>
										Descrição da transação (opcional)
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valor</FormLabel>
									<FormControl>
										<Input defaultValue={0} min={1} type="number" {...field} />
									</FormControl>
									<FormDescription>
										Valor da transação (obrigatório)
									</FormDescription>
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-between gap-2">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Categoria</FormLabel>
										<FormControl>
											<CategoryPicker
												type={type}
												onChange={handleCategoryChange}
											/>
										</FormControl>
										<FormDescription>
											Selecione uma categoria para transação
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Data</FormLabel>
										<FormControl>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-[200px] pl-3 text-left',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value ? (
																format(field.value, 'PPP')
															) : (
																<span>Escolhe uma data</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={(value) => {
															if (!value) return;
															field.onChange(value);
														}}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										</FormControl>
										<FormDescription>
											Selecione uma data para transação
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
				<DialogFooter className="mt-2">
					<DialogClose asChild>
						<Button
							type="button"
							variant={'secondary'}
							onClick={() => form.reset()}
						>
							Cancelar
						</Button>
					</DialogClose>
					<Button
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
						disabled={isPending}
					>
						{!isPending ? (
							'Criar'
						) : (
							<Loader2 size={16} className="animate-spin" />
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
