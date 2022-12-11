<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>


<div>
  <h1>{data.post.title}</h1>
  <p>{data.post.body}</p>

  <h4>Tags</h4>
  <ul>
  {#each data.post.tags as tag}
    <li>{tag}</li>
  {/each}
  </ul>
</div>
