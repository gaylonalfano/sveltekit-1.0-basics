<script>
  export let data;

  const { movies } = data;

</script>

<h1>Movies</h1>
{#each movies as movie}
  <div>
    <h2>{movie.title}</h2>
    <p>{movie.overview}</p>
  </div>
{/each}}
