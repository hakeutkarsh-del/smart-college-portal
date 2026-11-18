/*
  CCE-5 Smart Shopping Portal
  Unit V topics shown in this project:
  SPA, client-side routing, MVC, MVVM concept, reusable components,
  Angular and React overview, state management, scalable applications,
  and frontend-backend API interaction.
*/

const app = document.getElementById("app");

let products = [];
let cart = [];

// Load product data from JSON file.
fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    showPage();
  })
  .catch(() => {
    app.innerHTML = "<h2>Unable to load products. Please use Live Server.</h2>";
  });

// Simple client-side router. It changes content without reloading the page.
function showPage() {
  let page = location.hash.slice(1) || "home";

  if (page === "home") showHome();
  else if (page === "shop") showShop();
  else if (page === "cart") showCart();
  else if (page === "checkout") showCheckout();
  else if (page === "unit5") showUnit5();
  else app.innerHTML = "<h2>Page not found</h2>";

  document.getElementById("cartCount").innerText = cart.length;
}

window.addEventListener("load", showPage);
window.addEventListener("hashchange", showPage);

// Reusable component: creates one product card.
function productCard(product) {
  return `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}

// HOME view
function showHome() {
  app.innerHTML = `
    <section class="hero">
      <h2>Welcome to SmartCart</h2>
      <p>Find useful products at simple and affordable prices.</p>
      <a class="button" href="#shop">Shop Now</a>
    </section>
    <h2>Featured Products</h2>
    <div class="products">${products.slice(0, 3).map(productCard).join("")}</div>
  `;
}

// SHOP view
function showShop() {
  app.innerHTML = `
    <h2>All Products</h2>
    <div class="products">${products.map(productCard).join("")}</div>
  `;
}

// CART data and functions: this array is the application's current state.
function addToCart(id) {
  let product = products.find(item => item.id === id);
  cart.push(product);
  document.getElementById("cartCount").innerText = cart.length;
  alert("Product added to cart");
}

function showCart() {
  if (cart.length === 0) {
    app.innerHTML = '<h2>Your cart is empty</h2><a class="button" href="#shop">Continue Shopping</a>';
    return;
  }

  app.innerHTML = `
    <h2>Shopping Cart</h2>
    ${cart.map((item, index) => `
      <div class="cart-item">
        <b>${item.name}</b> - ₹${item.price}
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `).join("")}
    <h3>Total: ₹${cart.reduce((sum, item) => sum + item.price, 0)}</h3>
    <a class="button" href="#checkout">Checkout</a>
  `;
}

function removeItem(index) {
  cart.splice(index, 1);
  showPage();
}

// Checkout form with simple client-side validation.
function showCheckout() {
  if (cart.length === 0) {
    app.innerHTML = '<h2>Your cart is empty</h2><a class="button" href="#shop">Shop Now</a>';
    return;
  }

  app.innerHTML = `
    <h2>Checkout</h2>
    <form id="checkoutForm">
      <label>Name</label>
      <input type="text" id="name" placeholder="Enter your name">
      <label>Email</label>
      <input type="email" id="email" placeholder="Enter your email">
      <label>Address</label>
      <input type="text" id="address" placeholder="Enter your address">
      <p id="error" class="error"></p>
      <button type="submit">Place Order</button>
    </form>
  `;

  document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();

    if (name === "" || email === "" || address === "") {
      document.getElementById("error").innerText = "Please fill all the fields.";
    } else if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("error").innerText = "Please enter a valid email.";
    } else {
      app.innerHTML = "<h2>Thank you, " + name + "! Your demo order is placed.</h2>";
      cart = [];
      document.getElementById("cartCount").innerText = 0;
    }
  });
}

// Unit V syllabus concepts are explained here for the practical viva.
function showUnit5() {
  app.innerHTML = `
    <h2>Unit V - Front-End Frameworks & SPA Concepts</h2>

    <div class="topic">
      <h3>1. Traditional MPA and its limitations</h3>
      <p>In a multi-page application, every navigation reloads a complete page.
      It can be slower and may repeat common page content.</p>
    </div>

    <div class="topic">
      <h3>2. Single Page Application (SPA)</h3>
      <p>SmartCart uses one HTML page. JavaScript changes only the content inside
      the app area, without reloading the complete page.</p>
    </div>

    <div class="topic">
      <h3>3. MVC Architecture</h3>
      <p>Model stores product and cart data, View displays the page, and Controller
      functions handle actions such as adding or removing products.</p>
    </div>

    <div class="topic">
      <h3>4. MVVM Architecture</h3>
      <p>MVVM has Model, View and ViewModel. Data binding keeps the View and
      ViewModel synchronised automatically. Angular uses this style of binding.</p>
    </div>

    <div class="topic">
      <h3>5. Component-Based Development</h3>
      <p>The productCard() function is a reusable component. It creates product
      cards using product data.</p>
    </div>

    <div class="topic">
      <h3>6. Angular and React</h3>
      <p>Angular is a TypeScript-based framework with features such as routing,
      services and forms. React is a JavaScript library for building reusable
      UI components. Both are used to build SPAs.</p>
    </div>

    <div class="topic">
      <h3>7. Routing and State Management</h3>
      <p>Routing selects which view is displayed. The cart array stores the
      current cart state and the page updates when it changes.</p>
    </div>

    <div class="topic">
      <h3>8. Front-End Frameworks in Scalable Applications</h3>
      <p>Components, reusable code and organised structure make large applications
      easier to maintain and expand.</p>
    </div>

    <div class="topic">
      <h3>9. Frontend and Backend API Interaction</h3>
      <p>The frontend can request data from a backend using APIs. APIs commonly
      send and receive JSON. This project loads product data from products.json
      using fetch(). A real project can connect to a server API.</p>
    </div>
  `;
}

window.addEventListener("load", showPage);
