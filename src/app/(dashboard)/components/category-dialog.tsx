'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { TransactionType } from '@/lib/types';
import {
	CreateCategoriesSchema,
	CreateCategoriesSchemaType,
} from '@/schema/categories';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleOff, Loader2, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CreateCategory from '../_actions/categories';

interface CategoryDialogProps {
	type: TransactionType;
	successCallback: (category: Category) => void;
}

export default function CategoryDialog({
	type,
	successCallback,
}: CategoryDialogProps) {
	const [open, setOpen] = useState(false);
	const form = useForm<CreateCategoriesSchemaType>({
		resolver: zodResolver(CreateCategoriesSchema),
		defaultValues: {
			type,
		},
	});

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: CreateCategory,
		onSuccess: async (data: Category) => {
			form.reset({
				name: '',
				icon: '',
				type,
			});

			toast.success(`Categoria ${data.name} criada com sucesso 🎉.`, {
				id: 'create-category',
			});

			successCallback(data);

			await queryClient.invalidateQueries({
				queryKey: ['categories'],
			});

			setOpen((prev) => !prev);
		},
		onError: () => {
			toast.error('Algo deu errado.', {
				id: 'create-category',
			});
		},
	});

	const onSubmit = useCallback(
		(values: CreateCategoriesSchemaType) => {
			toast.loading('Criando categoria...', {
				id: 'create-category',
			});

			mutate(values);
		},
		[mutate]
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button
					variant={'ghost'}
					className="flex w-full border-separate items-center justify-start rounded-none border-b p-3 text-muted-foreground"
				>
					<Plus className="mr-2 h-4 w-4" />
					Criar novo
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar categoria {''}</DialogTitle>
					<DialogDescription>
						Categorias são usadas para agrupar suas transações
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Categoria" {...field} />
									</FormControl>
									<FormDescription>
										É assim que a sua categoria aparecerá no app
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ícone</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={'outline'}
													className="h-[100px] w-full"
												>
													{form.watch('icon') ? (
														<div className="flex flex-col items-center gap-2">
															<span className="text-2xl" role="img">
																{field.value}
															</span>
															<p className="text-xs text-muted-foreground">
																Clique para alterar
															</p>
														</div>
													) : (
														<div className="flex flex-col items-center gap-2">
															<CircleOff className="h-6 w-6" />
															<p className="text-xs text-muted-foreground">
																Clique para selecionar
															</p>
														</div>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-full">
												<Picker
													data={data}
													onEmojiSelect={(emoji: { native: string }) => {
														field.onChange(emoji.native);
													}}
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
									<FormDescription>
										É assim que sua categoria aparecerá no app
									</FormDescription>
								</FormItem>
							)}
						/>
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
