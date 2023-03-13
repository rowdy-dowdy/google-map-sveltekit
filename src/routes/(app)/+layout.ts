export const ssr = false;

import { fail, redirect, error } from '@sveltejs/kit';
import places from "$lib/components/data";

export const load = async (event) => {
  // const quizzes = await prisma.quizzes.findMany()

  // const places = places

  return {
    places: places
  }
}