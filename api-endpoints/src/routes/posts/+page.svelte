<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

</script>

<div>
  {#each data.posts as post (post.id)}
    <a href="/posts/{post.id}" data-sveltekit-prefetch><h1>{post.id}: {post.title}</h1></a>
    <p>{post.body}</p>
  {/each}
</div>
