// NOTE Use +page.server.js when you want to access PRIVATE
// data (database, API keys, etc.). You would generally create
// an .env file to store you private keys.
// NOTE +page.server.js does NOT have Svelte 'fetch()'
// NOTE This load/fetch does NOT happen in the browser ever!

import 'dotenv/config'

export const load = async () => {
  console.log('Server Load Ran! Wont see in browser console!')
  const fetchMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`)
    const data = await res.json()
    // Return the Promise since +page.svelte will use top-level await to resolve!
    return data.results
  }

  return {
    movies: fetchMovies(),
  }
}
