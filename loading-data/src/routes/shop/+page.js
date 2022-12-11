// NOTE +page.svelte receives its data from a load() function,
// which is defined inside the +page.js file.
// NOTE +page.js is a 'flex' between server and client
// NOTE When you page refresh, it's going to do a SSR first

export const load = async ({ fetch }) => {

  // BAD method:
  // const response = await fetch('https://dummyjson.com/products?limit=10');
  // const data = await response.json();
  // const products = data.products;

  // BETTER method (runs in parallel!):
  // NOTE Better to return the Promises since they are auto-resolved,
  // thanks to top-level promises will be awaited, so it's easy to
  // return multiple promises without creating a waterfall!
  async function fetchProducts() {
    const productsRes = await fetch('https://dummyjson.com/products?limit=10');
    const productsData = await productsRes.json();
    // NOTE Just return the Promise!
    return productsData.products;
  }

  // async function fetchUsers() {
  //   const usersRes = await fetch('https://dummyjson.com/users?limit=10');
  //   const usersData = await usersRes.json();
  //   // NOTE Just return the Promise!
  //   return usersData.users;

  // }

  // NOTE This Object is 'data' on the +page.
  return {
    products: fetchProducts(),
    // users: fetchUsers(),
  }
}
