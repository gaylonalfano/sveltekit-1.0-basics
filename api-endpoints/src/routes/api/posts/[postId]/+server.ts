import type { RequestEvent } from '@sveltejs/kit';
// NOTE You can test this api endpoint using:
// curl -i -H "Authorization:MyAuthHeader" http://localhost:5173/posts/1
// If you want something to render, then you need to create the route page

// export const GET: RequestHandler = async ({}: RequestEvent) => {}

// NOTE We destructure params from RequestEvent so we can get the
// dynamic [postId] value from the route. Technically, you could
// get it from 'url', but you'd have to parse pathname.
export async function GET({ request, params }: RequestEvent) {
  // console.log(request);
  // console.log(url);

  const authHeader = request.headers.get('Authorization');

  if (authHeader !== 'MyAuthHeader') {
    return new Response(JSON.stringify({ message: "Invalid credentials!" }), { status: 401 });
  }

  const response = await fetch(`https://dummyjson.com/posts/${params.postId}`)
  const data = await response.json();

  return new Response(JSON.stringify(data), { status: 200 });
}
