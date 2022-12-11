import type { PageLoad } from "./$types";

export const load: PageLoad = ({ fetch, params }) => {
  console.log(params);

  async function fetchPost(id: string) {
    const postResponse = await fetch(`/api/posts/${id}`, {
      headers: {
        method: "GET",
        "Authorization": 'MyAuthHeader'
      }
    });
    const postData = await postResponse.json();

    return postData;
  }

  return {
    post: fetchPost(params.postId)
  }
}
