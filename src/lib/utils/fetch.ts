import { get } from "svelte/store"
import { authStore } from "../../stores/auth"

const APP_URL = "http://192.168.1.7/example-app/public"

const Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> => {
  let auth = get(authStore)

  init = {
    ...init,
    headers: {
      ...init?.headers,
      'Authorization': 'Bearer ' + auth.token
    }
  }

  return new Promise((res,rej) => {
    fetch(APP_URL + input, init)
      .then(res => res.json())
      .then(data => res(data))
      .catch(e => rej(e))
  })
}

export {
  Fetch
}