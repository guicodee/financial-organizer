'use server';

import prisma from '@/lib/prisma';
import {
	CreateCategoriesSchema,
	CreateCategoriesSchemaType,
} from '@/schema/categories';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CreateCategory(form: CreateCategoriesSchemaType) {
	const parseBody = CreateCategoriesSchema.safeParse(form);
	if (!parseBody.success) {
		throw new Error('Erro.');
	}

	const user = await currentUser();
	if (!user) redirect('/sign-in');

	const { icon, name, type } = parseBody.data;

	try {
		return await prisma.category.create({
			data: {
				userId: user.id,
				icon,
				name,
				type,
			},
		});
	} catch (error) {
		throw new Error('Erro ao criar categoria.');
	}
}
