export default function urlConstruction(baseURL: string, endpoint: string, lang?:string, params?: string) {
  const url = new URL(endpoint, baseURL + lang);
  const searchParams = new URLSearchParams(params)
  if (searchParams.size) {
    return new URL(`${url.origin}${url.pathname}?${searchParams}`).href;
  }
  return new URL(`${url.origin}${url.pathname}`).href;
}