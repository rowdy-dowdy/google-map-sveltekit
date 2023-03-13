import type { PageLoad } from "./$types"
import { fail, redirect, error,  } from '@sveltejs/kit';
import places from "$lib/components/data";
import { alertStore } from "../../stores/alert";
import { get,  } from "svelte/store";
import { browser } from "$app/environment";
import { preloadData } from "$app/navigation";

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

export const load: PageLoad = async (event) => {
  const placeIndex = places.findIndex(v => v.slug == event.params.slug)
  // await new Promise((res) => {
  //   setTimeout(() => {
  //     res(true)
  //   }, 2000);
  // })

  if (placeIndex < 0) {
    alertStore.addAlert({
      type: "error",
      title: "Không tìm thấy địa điểm bạn yêu cầu"
    })
    throw redirect(307, '/');
  }

  return {
    place: places[placeIndex],
    prev: placeIndex > 0 ? places[placeIndex - 1].slug : null,
    next: placeIndex < (places.length - 1) ? places[placeIndex + 1].slug : null,
  }
}