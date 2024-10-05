'use client';

import {
	Dialog,
	DialogContent,
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
	CreateTransactionSchema,
	CreateTransactionSchemaType,
} from '@/schema/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import CategoryPicker from './category-picker';

interface DialogTransactionProps {
	trigger: ReactNode;
	type: TransactionType;
}

export default function DialogTransaction({
	trigger,
	type,
}: DialogTransactionProps) {
	const form = useForm<CreateTransactionSchemaType>({
		resolver: zodResolver(CreateTransactionSchema),
		defaultValues: {
			type,
			date: new Date(),
		},
	});

	return (
		<Dialog>
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
					<form className="space-y-4">
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
									<FormItem>
										<FormLabel>Categoria</FormLabel>
										<FormControl>
											<CategoryPicker type={type} />
										</FormControl>
										<FormDescription>
											Selecione uma categoria para transação
										</FormDescription>
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
