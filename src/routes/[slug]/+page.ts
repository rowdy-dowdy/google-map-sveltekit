import type { PageLoad } from "./$types"
import { fail, redirect, error } from '@sveltejs/kit';
import places from "$lib/components/data";

type PlaceType = {
  id: number;
  slug: string;
  title: string;
  description: string;
  images: string[];
  position: {
      lat: number;
      lng: number;
  };
}

export const load: PageLoad = async ({params}) => {
  const placeIndex = places.findIndex(v => v.slug == params.slug)

  if (placeIndex < 0) {
    throw redirect(307, '/');
  }

  return {
    place: places[placeIndex],
    prev: placeIndex > 0 ? places[placeIndex - 1].slug : null,
    next: placeIndex < (places.length - 1) ? places[placeIndex + 1].slug : null,
  }
}