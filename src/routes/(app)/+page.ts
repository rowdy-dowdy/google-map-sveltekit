import { fail, redirect, error } from '@sveltejs/kit';

export const load = async ({parent}) => {
  // const quizzes = await prisma.quizzes.findMany()

  const { places } = await parent();

  return {
    places: places
  }
}