export default function urlConstruction(baseURL: string, endpoint: string, params?: string) {
  const url = new URL(endpoint, baseURL);
  const searchParams = new URLSearchParams(params)
  if(searchParams.size) {
    return new URL(`${url.origin}${url.pathname}?${searchParams}`).href;
  } else {
    return new URL(`${url.origin}${url.pathname}`).href;
  }

}