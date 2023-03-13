import { browser } from '$app/environment';
import { writable, get } from 'svelte/store'

type AuthType = {
  user: {
    id: number,
    name: string,
    email: string,
    email_verified_at?: string | null,
    created_at: Date,
    updated_at: Date,
    image?: string
  } | null,
  token?: string
}

export function createAuth() {
  let authState = {user: null}

  if (browser) {
    let authLocal = localStorage.getItem('auth')
    authState = authLocal ? JSON.parse(authLocal) : authState
  }

  const store = writable<AuthType>(authState);

  const { subscribe, set, update } = store

  return {
    subscribe,
    set: (data: AuthType) => {
      if (browser) {
        localStorage.setItem('auth', JSON.stringify(data))
      }
      set(data);
    },
    update: (cb: any) => {
      const updatedStore = cb(get(store));

      if (browser) {
        localStorage.setItem('auth', JSON.stringify(updatedStore))
      }
      set(updatedStore);
    }
  };
}

export const authStore = createAuth();