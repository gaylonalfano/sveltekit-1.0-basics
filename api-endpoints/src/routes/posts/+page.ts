import type { PageLoad } from "./$types";

export const load: PageLoad = ({ fetch, params }) => {
  console.log(params);

  async function fetchPosts() {
    // Fetch from our api/posts endpoint
    // Q: Since we're hitting an internal API endpoint (+server.ts),
    // is there anything else to do besides fetch()?
    // Q: How to send HTTP Headers for Authorization and POST requests?
    // E.g., curl -H "Content-Type: application/json" -H "Authorization:MyAuthHeader" -d '{"title":"My first post", "content":"My amazing post content."}' http://localhost:5173/api/posts
    // A: Pass in a second arg object to fetch()!
    const postsResponse = await fetch("/api/posts", {
      method: "GET",
      headers: {
        'Authorization': 'MyAuthHeader',
      }
    });
    const postsData = await postsResponse.json();
    return postsData.posts;
  }

  return {
    posts: fetchPosts()
  }

}
