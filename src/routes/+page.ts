import type { PageLoad } from "./$types"
import { fail, redirect, error } from '@sveltejs/kit';

export const load: PageLoad = async ({parent}) => {
  // const quizzes = await prisma.quizzes.findMany()

  const { places } = await parent();

  return {
    places: places
  }
}