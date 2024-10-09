let filteredProducts = [...products]; // a shallow copy of the products array
const productsContainer = document.querySelector('.products-container');

/* Render Products */

function displayProducts() {
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `
      No products found.<br>Try something else.
    `;
    return;
  }

  productsContainer.innerHTML =
    filteredProducts.map((product) => {
      const { id, title, image, price } = product;
      return `
        <article class="product" data-id="${id}">
        <img
          src="${image}"
          class="product-img img"
        />
        <div class="product-info">
          <h5 class="product-name">${title}</h5>
          <span class="product-price">$${price.toFixed(2)}</span>
          <hr>
        </div>
      </article>
      `;
    }).join('');
};

displayProducts();

/* Search Filter */

const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLocaleLowerCase().includes(inputValue);
  });
  displayProducts();
});

/* console.log(
  products.filter((product) => {
    return product.title.toLowerCase().includes('');
  })
);
 */

/* Render Filter Buttons */

const brandsContainer = document.querySelector('.brands');

function displayButtons() {
  const buttons = [ 'All', ...new Set(products.map((product) => product.brand))];
  // Set constructor: new Set() always creates a Set object - a collection of *unique* values
  // Set { 'ikea', 'marcos', 'caressa' }
  // Spread Operator ...: It takes all elements of the Set (or any iterable) and spreads them out into a new array
  
  brandsContainer.innerHTML = 
    buttons.map((brand) => {
      return `
        <button class="brand-btn" data-id="${brand}">${brand}</button>
      `;
    }).join('');
};

displayButtons(); 

let selectedElement = document.querySelector('.brand-btn[data-id="All"]');

if (selectedElement) {
  selectedElement.classList.add('active');
};

brandsContainer.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.classList.contains('brand-btn')) return;

  if (selectedElement) {
    selectedElement.classList.remove('active');
  };

  selectedElement = target;
  
  const selectedBrand = target.dataset.id;

  filteredProducts = selectedBrand === 'All'
    ? [...products]
    : products.filter((product) => product.brand === selectedBrand);

  searchInput.value = '';
  selectedElement.classList.add('active');
  displayProducts();
});

