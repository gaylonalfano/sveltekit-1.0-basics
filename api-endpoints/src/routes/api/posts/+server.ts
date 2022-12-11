import { SECRET_API_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
// NOTES:
// - +server.js files expose a JSON API
// - Each HTTP verb function takes a RequestEvent argument and returns a Response object.
//   interface RequestEvent { cookies, fetch, getClientAddress, locals, params, platform, request, routeId, setHeaders, url}
// - To test sending a request with cURL:
//   curl -iH "Authorization:MyAuthHeader" http://localhost:5173/api/posts 
// - Scenario you have an ENV var for a private API/DB Key, which fetches data from
//   an external API. We don't want to expose this API Key on Client. We COULD
//   make multiple load() functions to do this, but instead we can do all the
//   data fetching here inside our custom API endpoint, and use our load() fn
//   to fetch this endpoint! Much cleaner and safer!
// - Use 'url' from RequestEvent to allow user to pass query params to filter API data
//   Meaning, we literally pass/curl URL with params: https://...?limit=10&skip=5
// - We could do all of this inside +page.js with load(), but it's all from Client
//   and less secure. Can do the same for individual [postId] route params.

export async function GET({ request, url }: RequestEvent) {
  // NOTE 'request' gives access to headers. We can pretend our API has authorization
  // headers that need to get passed in order to access the API.
  const authHeader = request.headers.get('Authorization');
  // console.log(authHeader); // Logs in the server console!
  console.log(SECRET_API_KEY);
  // NOTE Usually perform a check to confirm authHeader is valid token
  // This is a good way to add authorization to your API endpoint.
  if (authHeader !== 'MyAuthHeader') {
    return new Response(JSON.stringify({ message: "Invalid credentials!" }), { status: 401 })
  }

  // Allow user to limit and filter API fetched data
  const limit = Number(url.searchParams.get('limit') ?? '10');
  const skip = Number(url.searchParams.get('skip') ?? '0');

  // Now let's pretend to send back API data if they have authHeader
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  const data = await response.json();


  return new Response(JSON.stringify(data), { status: 200 });
}



export async function POST({ request }: RequestEvent) {
  // Parse the JSON out of the response body
  const body = await request.json();
  const authHeader = request.headers.get('Authorization');

  if (authHeader !== 'MyAuthHeader') {
    return new Response(JSON.stringify({ message: "Invalid credentials!" }), { status: 401 });
  }

  return new Response(JSON.stringify({ message: "POST request received!" }), { status: 201 });
}
