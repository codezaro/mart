(async () => {
  const productContainerEl = document.getElementById("productContainer");
  const searchInputEl = document.getElementById("searchInput");
  const url = "https://fakestoreapi.com/products";

  const fetchProducts = async () => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      return error;
    }
  };
  const products = await fetchProducts();
  const generateProducts = (product) => {
    return `<div class="product_card">
<div class="image_container">
  <img
    src=${product.image}
    alt=""
  />
</div>
<div class="product_content">
  <h2>${product.title}</h2>
  <p>
   ${product.description.split(" ").slice(0, 20).join(" ")}
  </p>
  <button>$${product.price}</button>
</div>`;
  };
  const renderProducts = (prod) => {
    productContainerEl.innerHTML = "";
    prod.forEach((product) => {
      productContainerEl.innerHTML += generateProducts(product);
    });
  };

  const checkText = (text, searchText) => {
    console.log(text);
    return text.toString().toLowerCase().includes(searchText);
  };

  const filterHandler = (event) => {
    const searchText = event.target.value.toLowerCase();

    const filteredProduct = products.filter((product) => {
      return (
        checkText(product.title, searchText) ||
        checkText(product.description, searchText) ||
        checkText(product.price, searchText)
      );
    });
    renderProducts(filteredProduct);
  };
  searchInputEl.addEventListener("keyup", filterHandler);
  renderProducts(products);
})();
