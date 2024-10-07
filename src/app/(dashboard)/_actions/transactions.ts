'use server';

import prisma from '@/lib/prisma';
import {
	CreateTransactionSchema,
	CreateTransactionSchemaType,
} from '@/schema/transactions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CreateTransaction(
	form: CreateTransactionSchemaType
) {
	const parseBody = CreateTransactionSchema.safeParse(form);
	if (!parseBody.success) {
		throw new Error(parseBody.error.message);
	}

	const user = await currentUser();
	if (!user) redirect('/sign-in');

	const { amount, category, date, type, description } = parseBody.data;
	const categoryRow = await prisma.category.findFirst({
		where: {
			userId: user.id,
			name: category,
		},
	});

	if (!categoryRow) {
		throw new Error('Categoria não encontrada.');
	}

	await prisma.$transaction([
		prisma.transactions.create({
			data: {
				userId: user.id,
				amount,
				date,
				type,
				description: description || '',
				category: categoryRow.name,
				categoryIcon: categoryRow.icon,
			},
		}),
	]);

	await prisma.monthHistory.upsert({
		where: {
			day_month_year_userId: {
				userId: user.id,
				day: date.getUTCDate(),
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
			},
		},
		create: {
			userId: user.id,
			day: date.getUTCDate(),
			month: date.getUTCMonth(),
			year: date.getUTCFullYear(),
			expense: type === 'expense' ? amount : 0,
			income: type === 'income' ? amount : 0,
		},
		update: {
			expense: {
				increment: type === 'expense' ? amount : 0,
			},
			income: {
				increment: type === 'income' ? amount : 0,
			},
		},
	});

	await prisma.yearHistory.upsert({
		where: {
			month_year_userId: {
				userId: user.id,
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
			},
		},
		create: {
			userId: user.id,
			month: date.getUTCMonth(),
			year: date.getUTCFullYear(),
			expense: type === 'expense' ? amount : 0,
			income: type === 'income' ? amount : 0,
		},
		update: {
			expense: {
				increment: type === 'expense' ? amount : 0,
			},
			income: {
				increment: type === 'income' ? amount : 0,
			},
		},
	});
}
