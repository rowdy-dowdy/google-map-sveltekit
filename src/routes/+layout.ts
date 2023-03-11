export const ssr = false;

import type { LayoutLoad } from "./$types"
import { fail, redirect, error } from '@sveltejs/kit';
import places from "$lib/components/data";

export const load: LayoutLoad = async (event) => {
  // const quizzes = await prisma.quizzes.findMany()

  // const places = places

  return {
    places: places
  }
}