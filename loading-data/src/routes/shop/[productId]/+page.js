export const load = async ({ fetch, params }) => {
  console.log(params);

  async function fetchProduct(id) {
    const productRes = await fetch(`https://dummyjson.com/products/${id}`);
    const productData = await productRes.json();
    return productData;
  }

  return {
    product: fetchProduct(params.productId),
  }

}
